import { combineReducers } from 'redux';
import currentUser from './currentUser';
import socialAuth from './socialAuth';
import posts from './posts';
import feed from './feed';
import postComments from './postComments';

const reducers = combineReducers({
  currentUser,
  posts,
  feed,
  socialAuth,
  postComments,
});

export default reducers;
