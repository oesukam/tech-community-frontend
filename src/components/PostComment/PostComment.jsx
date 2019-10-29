import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostTextArea from '../PostTextArea/PostTextArea';
import postCommentAction from '../../actions/postCommentAction';
import { handleShowAndHide as toggleSocialModal } from '../../actions/socialAuth';

export class PostComment extends Component {
  state = {};

  render() {
    const {
      post, slug, loading, error, tick, onToggleSocialModal, isAuth,
    } = this.props;
    return (
      <PostTextArea
        comment
        minChar={1}
        placeholder="Write your comment here"
        slug={slug}
        post={post}
        loading={loading}
        error={error}
        tick={tick}
        isAuth={isAuth}
        allowImagePicker={false}
        onToggleSocialModal={onToggleSocialModal}
      />
    );
  }
}

PostComment.propTypes = {
  slug: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.any,
  tick: PropTypes.bool,
  post: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  onToggleSocialModal: PropTypes.func.isRequired,
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
export const mapStateToProps = ({ currentUser: { isAuth }, postComment }) => {
  const { loading, error, tick } = postComment;
  return {
    loading,
    error,
    tick,
    isAuth,
  };
};

/**
 * Maps dispatches to props
 * @param {*} dispatch
 * @returns {object} props
 */
export const mapDispatchToProps = (dispatch) => ({
  post: (payload) => dispatch(postCommentAction(payload)),
  onToggleSocialModal: (show) => dispatch(toggleSocialModal(show)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostComment);
