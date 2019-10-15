import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import './Feed.scss';
import { getFeed, getFeedOrganizations } from '../../actions/feedActions';
import ContentLoader from '../Helpers/ContentLoader';
import onScrollToBottom from '../../helpers/onScrollToBottom';
import resolvePlaceholder from '../../helpers/resolvePlaceHolder';
import TimeAgo from '../Helpers/TimeAgo';
import Like from '../Like/Like';

export class Feed extends Component {
  componentDidMount() {
    const { onGetFeed, limit, onGetFeedOrganizations } = this.props;
    onGetFeed({ limit, itemsLength: 0 });
    onGetFeedOrganizations();
    window.onscroll = debounce(() => {
      onScrollToBottom(() => this.handleInfiniteScroll());
    });
  }

  handleInfiniteScroll() {
    const { onGetFeed, feed = [], limit } = this.props;
    if (feed.length < 1) return;
    onGetFeed({ limit, itemsLength: feed.length });
  }

  render() {
    const { feed = [], loading, history: { push } } = this.props;

    return (
      <>
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
              <div
                role="presentation"
                className="post"
                key={slug}
                onClick={() => push(`/post/${slug}`)}
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
                        role="presentation"
                        className="name"
                        onClick={() => push(`/profile/${username}`)}
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

                  <div className="action share">
                    <i className="fas fa-share-alt" />
                  </div>
                </div>
              </div>
            ),
          )}

          {loading
            && [...Array(feed.length > 1 ? 1 : 3)].map((value) => (
              <ContentLoader key={value} />
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
export const mapStateToProps = ({ feed: { items: feed, loading, limit } }) => ({
  feed,
  loading,
  limit,
});

/**
 * Maps dispatches to props
 * @param {*} dispatch
 * @returns {object} props
 */
export const mapDispatchToProps = (dispatch) => ({
  onGetFeed: (payload) => dispatch(getFeed(payload)),
  onGetFeedOrganizations: (payload) => dispatch(getFeedOrganizations(payload)),
});

Feed.propTypes = {
  feed: PropTypes.array,
  loading: PropTypes.bool,
  limit: PropTypes.number,
  onGetFeed: PropTypes.func,
  history: PropTypes.any,
  onGetFeedOrganizations: PropTypes.func,
  match: PropTypes.any,
};

Feed.defaultProps = {
  feed: [],
  loading: false,
  limit: 0,
  match: {},
  onGetFeed: () => '',
  history: {},
  onGetFeedOrganizations: () => '',
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Feed);
