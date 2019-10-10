import React from 'react';
import './Home.scss';
import PropTypes from 'prop-types';
import Layout from '../../containers/Layout/Layout';
import Post from '../../components/Post/Post';
import Feed from '../../components/Feed/Feed';

export const Home = ({ match, location, history: { push } }) => (
  <Layout match={match} location={location}>
    <div className="container-fluid">
      <div className="row">
        <Post />
        <Feed push={push} />
      </div>
    </div>
  </Layout>
);

Home.propTypes = {
  location: PropTypes.any,
  match: PropTypes.any,
  history: PropTypes.any,
};

Home.defaultProps = {
  location: {},
  match: {},
  history: {},
};

export default Home;
