import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ContentLoader from '../Helpers/ContentLoader';
import Post from '../PostComponent/PostCard';
import PostComment from '../PostComment/PostComment';
import fetchSinglePost from '../../actions/fetchSinglePostAction';
import PostComments from '../PostComments/PostComments';
import './SinglePost.scss';

export class SinglePost extends Component {
  state = {};

  componentDidMount() {
    const {
      onFetchSinglePost, slug,
    } = this.props;
    onFetchSinglePost(slug);
  }

  renderRelatedPosts = () => {
    const { onFetchSinglePost, relatedPosts: { isEmpty, feed }, history: { push } } = this.props;
    if (isEmpty) return <span className="text-muted font-weight-bolder">Nothing yet!</span>;
    return feed.map(
      (post) => <Post {...post} key={post._id} push={push} onFetchSinglePost={onFetchSinglePost} />,
    );
  }


  render() {
    const { post, slug } = this.props;
    return (
      <div className="row" id="single-post">
        <div className="col-md-8">
          <div className="single-post">
            {!post ? (
              <ContentLoader />
            ) : (
              <>
                <Post {...post} />
                <hr />
                <PostComment slug={post.slug} allowImagePicker={false} />
                <PostComments post={post} slug={slug} />
              </>
            )}
          </div>
        </div>
        <div className="col-md-4 related-posts">
          <h4 className="mb-4">
            Related Posts
          </h4>
          {this.renderRelatedPosts()}
        </div>
      </div>
    );
  }
}

SinglePost.propTypes = {
  onFetchSinglePost: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
  relatedPosts: PropTypes.object.isRequired,
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.object.isRequired,
};

/**
 * Maps the state to props
 * @param {*} { auth }
 * @returns {object} props
 */
export const mapStateToProps = ({ singlePost: { post, relatedPosts } }) => ({ post, relatedPosts });

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
