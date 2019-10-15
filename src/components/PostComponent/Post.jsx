import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Post.scss';
import TimeAgo from '../Helpers/TimeAgo';
import resolvePlaceholder from '../../helpers/resolvePlaceHolder';
import Like from '../Like/Like';
import SharePost from '../SharePost/SharePost';

class Post extends Component {
  state = {
    show: false,
    postSlug: '',
  };

  handleOpenSharePost(postSlug) {
    this.setState({ show: true, postSlug });
  }

  handleCloseSharePost() {
    this.setState({ show: false });
  }

  render() {
    const {
      author: { username, picture: profilePicture },
      userType,
      image,
      description,
      likesCount,
      createdAt,
      liked,
      slug,
      push,
    } = this.props;
    const { show, postSlug } = this.state;
    const { handleCloseSharePost } = this;
    return (
      <>
        <SharePost
          show={show}
          handleClose={handleCloseSharePost}
          postSlug={postSlug}
        />
        <div
          className="post"
          onClick={() => push && push(`/post/${slug}`)}
          onKeyDown={() => null}
          role="button"
          tabIndex="-1"
        >
          <div className="header">
            <div className="right">
              <img
                className="image"
                src={resolvePlaceholder(profilePicture, userType)}
                alt="placeholder"
              />

              <div className="info">
                <span
                  onKeyDown={() => null}
                  role="button"
                  tabIndex="-1"
                  className="name"
                  onClick={() => push && push(`/profile/${username}`)}
                >
                  {username}
                </span>
                <span className="label">{userType}</span>
              </div>
            </div>

            <div className="date">
              <TimeAgo date={createdAt} />
            </div>
          </div>

          {image && <img src={image} alt="" className="post-image" />}

          <div className="body">{description}</div>

          <div className="category">Web design</div>

          <div className="bottom">
            <div className="left">
              <Like {...{ slug, likesCount, liked }} />

              <div className="action">
                <i className="far fa-comment-alt" />
                <span className="count">12</span>
              </div>
            </div>

            <div
              onKeyDown={() => null}
              role="button"
              tabIndex="-1"
              className="action share"
              onClick={() => this.handleOpenSharePost(slug)}
            >
              <i className="fas fa-share-alt" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

Post.propTypes = {
  author: PropTypes.object.isRequired,
  userType: PropTypes.string.isRequired,
  image: PropTypes.string,
  description: PropTypes.string.isRequired,
  likesCount: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  liked: PropTypes.bool,
  slug: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
};

Post.defaultProps = {
  image: null,
  liked: false,
};

export default Post;
