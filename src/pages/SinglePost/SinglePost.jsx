import React from 'react';
import PropTypes from 'prop-types';
// import './Home.scss';
import Layout from '../../containers/Layout/Layout';
import Post from '../../components/SinglePost/SinglePost';

const SinglePost = ({ match, location }) => (
  <Layout match={match} location={location}>
    <div className="container-fluid">
      <div className="row">
        <Post slug={match.params.slug} />
      </div>
    </div>
  </Layout>
);


SinglePost.propTypes = {
  match: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
};

export default SinglePost;
