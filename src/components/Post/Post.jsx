import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import postAction from '../../actions/postActions';
import PostTextArea from '../PostTextArea/PostTextArea';

export class Post extends Component {
  render() {
    const { post } = this.props;
    const { loading, error, tick } = this.props;
    return (
      <PostTextArea post={post} loading={loading} error={error} tick={tick} />
    );
  }
}

Post.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  tick: PropTypes.bool,
};

Post.defaultProps = {
  loading: false,
  error: false,
  tick: false,
};

/**
 * Maps the state to props
 * @param {*} { auth }
 * @returns {object} props
 */
export const mapStateToProps = ({ posts }) => {
  const { loading, error, post } = posts;
  return {
    loading,
    error,
    tick: !!post,
  };
};

/**
 * Maps dispatches to props
 * @param {*} dispatch
 * @returns {object} props
 */
export const mapDispatchToProps = dispatch => ({
  post: data => dispatch(postAction(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
