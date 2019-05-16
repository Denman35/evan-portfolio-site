import linearPartition from 'linear-partition';

const MOBILE_PART = 1.3;
const DESK_PART = 2.8;

export const partitionBlock = (arr) => {
  /* eslint-disable no-restricted-globals */
  const part = screen.width <= 600 ? MOBILE_PART : DESK_PART;
  /* eslint-enable no-restricted-globals */
  const numRows = Math.ceil(arr.length / part);
  const weights = arr.map(x => {
    const og = x.images[x.images.length-1];
    return og.width / og.height;
  });

  const partitioned = linearPartition(weights, numRows);

  const rows = [];
  let count = 0;
  partitioned.forEach(row => {
    rows.push([]);
    row.forEach(x => {
      rows[rows.length - 1].push(arr[count]);
      count += 1;
    });
  });

  return rows;
};
