import { combineReducers } from 'redux';
import currentUser from './currentUser';
import auth from './signup';
import login from './login';
import posts from './posts';
import feed from './feed';

const reducers = combineReducers({ currentUser, auth, login, posts, feed });

export default reducers;
