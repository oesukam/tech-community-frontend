import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import './Feed.scss';
import { getFeed, getFeedOrganizations } from '../../actions/feedActions';
import ContentLoader from '../Helpers/ContentLoader';
import onScrollToBottom from '../../helpers/onScrollToBottom';
import Post from '../PostComponent/Post';

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
      <div className="feed">
        {feed.map(
          (
            {
              author,
              userType,
              image,
              description,
              likesCount,
              createdAt,
              liked,
              slug,
            },
            index,
          ) => {
            const postProps = {
              author,
              userType,
              image,
              description,
              likesCount,
              createdAt,
              liked,
              slug,
              key: index,
              push,
            };
            return <Post {...postProps} />;
          },
        )}

        {loading
        && [...Array(feed.length > 1 ? 1 : 3)].map((value) => (
          <ContentLoader key={value} />
        ))}
      </div>
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
