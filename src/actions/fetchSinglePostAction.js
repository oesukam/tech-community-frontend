import server from '../Api/server';

import * as types from '../actionTypes/singlePostTypes';

import { getPostComments } from './postComments';

/**
 * Toggles the loading state
 * @return {object} action
 */
export const toggleLoading = (state) => ({
  type: types.TOGGLE_LOADING,
  payload: state,
});


/**
 * Set feed
 * @return {object} action
 */
export const fetchSuccess = (post) => ({
  type: types.FETCH_SUCCESS,
  payload: post,
});

/**
 * Set related posts
 * @return {object} action
 */
export const setPosts = (filteredFeed) => ({
  type: types.FETCH_RELATED_POSTS,
  payload: {
    isEmpty: !filteredFeed.length,
    feed: filteredFeed,
  },
});

const fetchRelatedPosts = (category, singlePostSlug) => async (dispatch) => {
  try {
    const { data: { feed } } = await server.get(`feed?offset=0&limit=3&category=${category}`);

    const filteredFeed = feed.filter(({ slug }) => slug !== singlePostSlug);
    dispatch(setPosts(filteredFeed));
  } catch (error) {
    console.error(error);
  }
};

/**
 * Get feed
 * @return {object} response
 */
export default (slug) => async (dispatch) => {
  dispatch(toggleLoading(true));

  try {
    const {
      data: { post },
    } = await server.get(
      `/posts/${slug}`,
    );

    dispatch(getPostComments(slug));
    dispatch(fetchSuccess(post));
    dispatch(toggleLoading(false));
    dispatch(fetchRelatedPosts(post.type, slug));
  } catch (e) {
    dispatch(toggleLoading(false));
  }
};
