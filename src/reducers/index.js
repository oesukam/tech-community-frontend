import { combineReducers } from 'redux';
import currentUser from './currentUser';
import socialAuth from './socialAuth';
import posts from './posts';
import feed from './feed';
import sharePost from './sharePost';

const reducers = combineReducers({
  currentUser,
  posts,
  feed,
  socialAuth,
  sharePost,
});

export default reducers;
