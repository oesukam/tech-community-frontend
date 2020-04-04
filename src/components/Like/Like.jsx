import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Like.scss';
import { like, unlike } from '../../actions/likeActions';
import { handleShowAndHide as toggleSocialModal } from '../../actions/socialAuth';

export class Like extends Component {
  state = {
    highlight: false,
    likesCount: 0,
  };

  componentDidMount() {
    const { liked, likesCount } = this.props;
    this.setState({ highlight: liked, likesCount });
  }

  componentDidUpdate(prevProps) {
    const { liked, likesCount } = this.props;
    if (prevProps.liked !== liked) this.setState({ highlight: liked, likesCount });
  }

  toggleLikeHighlight = () => {
    const { likesCount, highlight } = this.state;
    const checkLimit = () => (highlight && likesCount > 0 ? likesCount - 1 : likesCount + 1);

    this.setState({ highlight: !highlight, likesCount: checkLimit() });
  };

  handleLike = () => {
    const { highlight } = this.state;
    const {
      slug, onLike, onUnlike, isAuth, onToggleSocialModal,
    } = this.props;

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
        role="presentation"
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

export const mapDispatchToProps = (dispatch) => ({
  onLike: (slug) => dispatch(like(slug)),
  onUnlike: (slug) => dispatch(unlike(slug)),
  onToggleSocialModal: (show) => dispatch(toggleSocialModal(show)),
});

Like.propTypes = {
  slug: PropTypes.string,
  liked: PropTypes.bool,
  isAuth: PropTypes.bool,
  likesCount: PropTypes.number,
  onLike: PropTypes.func,
  onUnlike: PropTypes.func,
  onToggleSocialModal: PropTypes.func,
};

Like.defaultProps = {
  slug: '',
  isAuth: false,
  liked: false,
  likesCount: 0,
  onLike: () => '',
  onUnlike: () => '',
  onToggleSocialModal: () => '',
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Like);
