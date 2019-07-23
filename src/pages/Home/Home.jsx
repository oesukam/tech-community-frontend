import React, { Component } from 'react';
import './Home.scss';
import Layout from '../../containers/Layout/Layout';

export class Home extends Component {
  render() {
    const { match } = this.props;

    return (
      <Layout match={match}>
        <div className="container-fluid">
          <div className="row" />
        </div>
      </Layout>
    );
  }
}

export default Home;
