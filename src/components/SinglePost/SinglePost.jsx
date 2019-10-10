import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ContentLoader from '../Helpers/ContentLoader';
import Post from '../PostComponent/Post';
import PostTextArea from '../PostTextArea/PostTextArea';
import fetchSinglePost from '../../actions/fetchSinglePostAction';
import './SinglePost.scss';

class SinglePost extends Component {
  state = {};
  componentDidMount() {
    const { onFetchSinglePost, slug } = this.props;
    onFetchSinglePost(slug);
  }
  render() {
    const { post } = this.props;
    return (
      <Fragment>
        <div className="single-post">
          {!post ? <ContentLoader /> : <Post {...post} />}
        </div>
        <PostTextArea />
      </Fragment>
    );
  }
}

/**
 * Maps the state to props
 * @param {*} { auth }
 * @returns {object} props
 */
export const mapStateToProps = ({ singlePost: { post } }) => {
  return { post };
};

/**
 * Maps dispatches to props
 * @param {*} dispatch
 * @returns {object} props
 */
export const mapDispatchToProps = dispatch => ({
  onFetchSinglePost: slug => dispatch(fetchSinglePost(slug)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SinglePost);
