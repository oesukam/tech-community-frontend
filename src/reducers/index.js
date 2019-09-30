import { combineReducers } from 'redux';
import currentUser from './currentUser';
import auth from './signup';
import login from './login';
import posts from './posts';

const reducers = combineReducers({ currentUser, auth, login, posts });

export default reducers;
