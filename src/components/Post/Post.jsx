import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import postAction from '../../actions/postActions';
import PostTextArea from '../PostTextArea/PostTextArea';
import { handleShowAndHide as toggleSocialModal } from '../../actions/socialAuth';

export const Post = ({
  post, loading, error, tick, onToggleSocialModal, isAuth,
}) => (
  <PostTextArea
    post={post}
    loading={loading}
    error={error}
    tick={tick}
    onToggleSocialModal={onToggleSocialModal}
    isAuth={isAuth}
  />
);

Post.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  tick: PropTypes.bool,
  post: PropTypes.func,
  onToggleSocialModal: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
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
export const mapStateToProps = ({ posts, currentUser: { isAuth } }) => {
  const { loading, error, tick } = posts;
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
  post: (data) => dispatch(postAction(data)),
  onToggleSocialModal: (show) => dispatch(toggleSocialModal(show)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
