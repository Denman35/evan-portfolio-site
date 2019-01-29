import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import arrow_back from 'assets/arrow_back.svg';
import arrow_forward from 'assets/arrow_forward.svg';
import { fetchImageById } from 'services/api/image';

import './styles.scss';

class PhotoView extends Component {
  constructor() {
    super();

    this.state = {
      fetching: false,
      imageData: null,
      imageLoaded: false,
      next: null,
      prev: null,
    };
  }

  componentDidMount() {
    this.fetchImage();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.setState({ imageLoaded: false });
      setTimeout(this.fetchImage, 220);
    }
  }

  fetchImage = () => {
    fetchImageById(this.props.match.params.id)
      .then(data => this.setState({
        fetching: false,
        imageData: data.photo,
        next: data.next,
        prev: data.prev,
      }))
      .catch(err => this.setState({ fetching: false }));
  }

  handleLoad = () => {
    this.setState({
      imageLoaded: true,
    });
  }

  render() {
    const { imageData, fetching, prev, next, imageLoaded } = this.state;

    if (fetching || imageData === null) {
      return <div className="photo-view"><div className="photo loading" /></div>;
    }

    const { images, location, description } = imageData;
    const srcset = images.map(i => `${i.url} ${i.width}w`);
    return (
      <div className="photo-view">
        <div className={`photo ${imageLoaded ? 'ready' : 'loading'}`}>
          <img
            src={images[images.length-1].url}
            srcSet={srcset.join(', ')}
            sizes={`90vw`}
            alt={imageData.title}
            onLoad={this.handleLoad}
          />

          <div className="description">
            <p><strong>{location}</strong> | {description}</p>
          </div>
        </div>

        { prev &&
          <Link to={`/view/${prev}`}  className="arrow arrow-back">
            <img src={arrow_back} alt="Navigate back" />
          </Link>
        }
        { next &&
          <Link to={`/view/${next}`}  className="arrow arrow-forward">
            <img src={arrow_forward} alt="Navigate forward" />
          </Link>
        }
      </div>
    );
  }
}

export default PhotoView;
