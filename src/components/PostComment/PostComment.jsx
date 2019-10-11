import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostTextArea from '../PostTextArea/PostTextArea';
import postCommentAction from '../../actions/postCommentAction';

class PostComment extends Component {
  state = {};
  render() {
    const { post, slug, loading, error, tick } = this.props;
    return (
      <PostTextArea
        minChar={1}
        placeholder="Write your comment here"
        slug={slug}
        post={post}
        loading={loading}
        error={error}
        tick={tick}
        allowImagePicker={false}
      />
    );
  }
}

PostComment.propTypes = {
  slug: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.any,
  tick: PropTypes.bool,
};

PostComment.defaultProps = {
  loading: false,
  error: false,
  tick: false,
};

/**
 * Maps the state to props
 * @param {*} { auth }
 * @returns {object} props
 */
export const mapStateToProps = ({ postComment }) => {
  const { loading, error, tick } = postComment;
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
export const mapDispatchToProps = dispatch => ({
  post: (slug, body) => dispatch(postCommentAction(slug, body)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostComment);
