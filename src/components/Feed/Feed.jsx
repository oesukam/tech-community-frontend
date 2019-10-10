import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import './Feed.scss';
import { getFeed } from '../../actions/feedActions';
import ContentLoader from '../Helpers/ContentLoader';
import onScrollToBottom from '../../helpers/onScrollToBottom';
import Post from '../PostComponent/Post';

import SharePost from '../SharePost/SharePost';

export class Feed extends Component {
  state = {
    show: false,
    postSlug: '',
  };

  constructor(props) {
    super(props);

    window.onscroll = debounce(() => {
      onScrollToBottom(() => this.handleInfiniteScroll());
    });
  }

  componentDidMount() {
    const { onGetFeed, limit } = this.props;
    onGetFeed(limit, 0);
  }

  handleOpenSharePost = postSlug => {
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
    const { feed = [], loading, push } = this.props;

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

        {loading &&
          [...Array(feed.length > 1 ? 1 : 3)].map(value => (
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
export const mapDispatchToProps = dispatch => ({
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
