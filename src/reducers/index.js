import { combineReducers } from 'redux';
import currentUser from './currentUser';
import posts from './posts';
import feed from './feed';

const reducers = combineReducers({ currentUser, posts, feed });

export default reducers;
