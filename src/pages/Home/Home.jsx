import React, { Component } from 'react';
import './Home.scss';
import Layout from '../../containers/Layout/Layout';
import Post from '../../components/Post/Post';

export class Home extends Component {
  render() {
    const { match } = this.props;

    return (
      <Layout match={match}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12" title="hello the tooltip">
              Home
            </div>
            <Post />
          </div>
        </div>
      </Layout>
    );
  }
}

export default Home;
