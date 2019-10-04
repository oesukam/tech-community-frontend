import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Like.scss';
import { like, unlike } from '../../actions/likeActions';
import { handleShowAndHide as toggleSocialModal } from '../../actions/socialAuth';

export class Like extends Component {
  state = {
    highlight: false,
    likesCount: 0,
  };

  componentWillMount() {
    const { liked = false, likesCount } = this.props;
    this.setState({ highlight: liked, likesCount });
  }

  toggleLikeHighlight = () => {
    const { likesCount, highlight } = this.state;
    const checkLimit = () =>
      highlight && likesCount > 0 ? likesCount - 1 : likesCount + 1;

    this.setState({ highlight: !highlight, likesCount: checkLimit() });
  };

  handleLike = () => {
    const { highlight } = this.state;
    const { slug, onLike, onUnlike, isAuth, onToggleSocialModal } = this.props;

    if (!isAuth) return onToggleSocialModal(true);

    this.toggleLikeHighlight();

    if (highlight) return onUnlike(slug);

    onLike(slug);
  };

  render() {
    const {
      handleLike,
      state: { highlight, likesCount },
    } = this;

    return (
      <div
        className={`action ${highlight && 'liked'}`}
        title="Like"
        onClick={() => handleLike()}
      >
        <i className="fas fa-thumbs-up" />
        <span className="count">{likesCount}</span>
      </div>
    );
  }
}

export const mapStateToProps = ({ currentUser: { isAuth } }) => ({
  isAuth,
});

export const mapDispatchToProps = dispatch => ({
  onLike: slug => dispatch(like(slug)),
  onUnlike: slug => dispatch(unlike(slug)),
  onToggleSocialModal: show => dispatch(toggleSocialModal(show)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Like);
