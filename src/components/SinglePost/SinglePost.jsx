import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ContentLoader from '../Helpers/ContentLoader';
import Post from '../PostComponent/PostCard';
import PostComment from '../PostComment/PostComment';
import fetchSinglePost from '../../actions/fetchSinglePostAction';
import './SinglePost.scss';

export class SinglePost extends Component {
  state = {};

  componentDidMount() {
    const { onFetchSinglePost, slug } = this.props;
    onFetchSinglePost(slug);
  }

  render() {
    const { post } = this.props;
    return (
      <div className="single-post">
        {!post ? (
          <ContentLoader />
        ) : (
          <>
            <Post {...post} />
            <hr />
            <PostComment slug={post.slug} allowImagePicker={false} />
          </>
        )}
      </div>
    );
  }
}

SinglePost.propTypes = {
  onFetchSinglePost: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

/**
 * Maps the state to props
 * @param {*} { auth }
 * @returns {object} props
 */
export const mapStateToProps = ({ singlePost: { post } }) => ({ post });

/**
 * Maps dispatches to props
 * @param {*} dispatch
 * @returns {object} props
 */
export const mapDispatchToProps = (dispatch) => ({
  onFetchSinglePost: (slug) => dispatch(fetchSinglePost(slug)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SinglePost);
