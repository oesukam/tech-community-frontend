import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PostCard.scss';
import { connect } from 'react-redux';
import TimeAgo from '../Helpers/TimeAgo';
import resolvePlaceholder from '../../helpers/resolvePlaceHolder';
import Like from '../Like/Like';
import { setSharePostContent } from '../../actions/sharePostAction';

export class PostCard extends Component {
  handleOpenSharePost = () => {
    const { slug, _setSharePostContent, description } = this.props;
    _setSharePostContent({
      url: `/posts/${slug}`,
      content: description,
      title: `${description.substring(0, 40)}...`,
    });
  }

  handlePushPost(slug) {
    const { onFetchSinglePost, push } = this.props;
    push(`/posts/${slug}`);
    onFetchSinglePost(slug);
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
      commentsCount,
      comments,
    } = this.props;
    return (
      <>
        <div
          className="post post-comment"
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

          {image && (
          <img
            src={image}
            alt=""
            className="post-image"
            onClick={() => this.handlePushPost(slug)}
            onKeyDown={() => null}
            role="presentation"
            tabIndex="-1"
          />
          )}

          <div
            className="body"
            onClick={() => this.handlePushPost(slug)}
            onKeyDown={() => null}
            role="button"
            tabIndex="-1"
          >
            {description}
          </div>

          <div className="category">Web design</div>

          <div className="bottom">
            <div className="left">
              <Like slug={slug} likesCount={likesCount} liked={liked} />
              <div
                className="action"
                onClick={() => this.handlePushPost(slug)}
                onKeyDown={() => null}
                role="presentation"
                tabIndex="-1"
              >
                <i className="far fa-comment-alt" />
                <span className="count">{comments.length || commentsCount}</span>
              </div>
            </div>

            <div
              onKeyDown={() => null}
              role="button"
              tabIndex="-1"
              className="action share"
              onClick={() => this.handleOpenSharePost()}
            >
              <i className="fas fa-share-alt" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

PostCard.propTypes = {
  author: PropTypes.object.isRequired,
  userType: PropTypes.string.isRequired,
  image: PropTypes.string,
  description: PropTypes.string.isRequired,
  likesCount: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  liked: PropTypes.bool,
  slug: PropTypes.string.isRequired,
  push: PropTypes.func,
  _setSharePostContent: PropTypes.func,
  commentsCount: PropTypes.number,
  comments: PropTypes.array,
  onFetchSinglePost: PropTypes.func,
};

PostCard.defaultProps = {
  image: null,
  liked: null,
  _setSharePostContent: () => '',
  commentsCount: 0,
  comments: [],
  onFetchSinglePost: () => null,
  push: () => null,
};

const mapDispatchToProps = (dispatch) => ({
  _setSharePostContent: (payload) => dispatch(setSharePostContent(payload)),
});

const mapStateToProps = ({ postComments: { items } }) => ({
  comments: items,
});

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);
