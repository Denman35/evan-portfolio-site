import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';

import Upload from './scenes/Upload';
import Featured from './scenes/Featured';

const Root = withRouter((props) => (
  <ul>
    <li><Link to={`${props.match.url}upload`}>Portfolio Upload</Link></li>
    <li><Link to={`${props.match.url}featured`}>Set Featured</Link></li>
  </ul>
));

class Admin extends Component {
  render() {
    const { match } = this.props;
    console.log(this.props);

    return (
      <div className="admin container">
        <Route path={`${match.url}`} exact component={Root} />
        <Route path={`${match.url}upload`} exact component={Upload} />
        <Route path={`${match.url}featured`} exact component={Featured} />
      </div>
    );
  }
}

export default Admin;
