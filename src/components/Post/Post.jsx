import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import postAction from '../../actions/postActions';
import PostTextArea from '../PostTextArea/PostTextArea';

export const Post = ({
  post, loading, error, tick,
}) => (
  <PostTextArea
    post={post}
    loading={loading}
    error={error}
    tick={tick}
  />
);

Post.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  tick: PropTypes.bool,
  post: PropTypes.func,
};

Post.defaultProps = {
  loading: false,
  error: false,
  tick: false,
  post: () => '',
};

/**
 * Maps the state to props
 * @param {*} { auth }
 * @returns {object} props
 */
export const mapStateToProps = ({ posts }) => {
  const { loading, error, tick } = posts;
  return {
    loading,
    error,
    tick,
  };
};

/**
 * Maps dispatches to props
 * @param {*} dispatch
 * @returns {object} props
 */
export const mapDispatchToProps = (dispatch) => ({
  post: (data) => dispatch(postAction(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
