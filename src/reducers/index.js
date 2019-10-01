import { combineReducers } from 'redux';
import currentUser from './currentUser';
import socialAuth from './socialAuth';
import posts from './posts';
import feed from './feed';

const reducers = combineReducers({ currentUser, posts, feed, socialAuth });

export default reducers;
