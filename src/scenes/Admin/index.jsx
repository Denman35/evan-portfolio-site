import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';

import Upload from './scenes/Upload';
import Featured from './scenes/Featured';
import List from './scenes/List';

const Root = withRouter((props) => (
  <ul>
    <li><Link to={`${props.match.url}upload`}>Portfolio Upload</Link></li>
    <li><Link to={`${props.match.url}featured`}>Set Featured</Link></li>
    <li><Link to={`${props.match.url}list`}>Modify Photos</Link></li>
  </ul>
));

class Admin extends Component {
  render() {
    const { match } = this.props;

    return (
      <div className="admin container">
        <Route path={`${match.url}`} exact component={Root} />
        <Route path={`${match.url}upload`} exact component={Upload} />
        <Route path={`${match.url}featured`} exact component={Featured} />
        <Route path={`${match.url}list`} exact component={List} />
      </div>
    );
  }
}

export default Admin;
