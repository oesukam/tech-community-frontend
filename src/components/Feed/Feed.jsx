import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import './Feed.scss';
import TimeAgo from '../Helpers/TimeAgo';
import { getFeed } from '../../actions/feedActions';
import resolvePlaceholder from '../../helpers/resolvePlaceHolder';
import ContentLoader from '../Helpers/ContentLoader';
import onScrollToBottom from '../../helpers/onScrollToBottom';
import Like from '../Like/Like';

import SharePost from '../SharePost/SharePost';

export class Feed extends Component {
  state = {
    show: false,
    postSlug: '',
  };


  componentDidMount() {
    const { onGetFeed, limit } = this.props;
    onGetFeed(limit, 0);
    window.onscroll = debounce(() => {
      onScrollToBottom(() => this.handleInfiniteScroll());
    });
  }

  handleOpenSharePost = (postSlug) => {
    this.setState({ show: true, postSlug });
  };

  handleCloseSharePost = () => {
    this.setState({ show: false });
  };

  handleInfiniteScroll() {
    const { onGetFeed, feed = [], limit } = this.props;
    if (feed.length < 1) return;
    onGetFeed(limit, feed.length);
  }

  render() {
    const { feed = [], loading } = this.props;
    const { show, postSlug } = this.state;
    const { handleCloseSharePost } = this;

    return (
      <>
        <SharePost
          show={show}
          handleClose={handleCloseSharePost}
          postSlug={postSlug}
        />

        <div className="feed">
          {feed.map(
            (
              {
                author: { username, picture: profilePicture },
                userType,
                image: postImage,
                description,
                likesCount,
                createdAt,
                liked,
                slug,
              },
            ) => (
              <div className="post" key={slug}>
                <div className="header">
                  <div className="right">
                    <img
                      className="image"
                      src={resolvePlaceholder(profilePicture, userType)}
                      alt="placeholder"
                    />

                    <div className="info">
                      <span className="name">{username}</span>
                      <span className="label">{userType}</span>
                    </div>
                  </div>

                  <div className="date">
                    <TimeAgo date={createdAt} />
                  </div>
                </div>

                {postImage && (
                  <img src={postImage} alt="" className="post-image" />
                )}

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
                    role="presentation"
                    className="action share"
                    onClick={() => this.handleOpenSharePost(slug)}
                  >
                    <i className="fas fa-share-alt" />
                  </div>
                </div>
              </div>
            ),
          )}

          {loading
            && [...Array(feed.length > 1 ? 1 : 3)].map((value) => (
              <ContentLoader key={value.slug} />
            ))}
        </div>
      </>
    );
  }
}

/**
 * Maps the state to props
 * @param {*} { auth }
 * @returns {object} props
 */
export const mapStateToProps = ({
  feed: {
    items: feed,
    loading,
    limit,
  },
}) => ({ feed, loading, limit });

/**
 * Maps dispatches to props
 * @param {*} dispatch
 * @returns {object} props
 */
export const mapDispatchToProps = (dispatch) => ({
  onGetFeed: (limit, itemsLength) => dispatch(getFeed(limit, itemsLength)),
});

Feed.propTypes = {
  feed: PropTypes.array,
  loading: PropTypes.bool,
  limit: PropTypes.number,
  onGetFeed: PropTypes.func,
};

Feed.defaultProps = {
  feed: [],
  loading: false,
  limit: 0,
  onGetFeed: () => '',
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Feed);
