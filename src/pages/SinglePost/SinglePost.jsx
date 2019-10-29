import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../containers/Layout/Layout';
import Post from '../../components/SinglePost/SinglePost';

const SinglePost = ({ match, location, history }) => (
  <Layout match={match} location={location} history={history}>
    <div className="container-fluid">
      <Post slug={match.params.slug} />
    </div>
  </Layout>
);


SinglePost.propTypes = {
  match: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
  history: PropTypes.any,
};

SinglePost.defaultProps = {
  history: {},
};

export default SinglePost;
