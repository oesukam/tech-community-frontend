import { combineReducers } from 'redux';
import currentUser from './currentUser';
import auth from './signup';
import login from './login';

const reducers = combineReducers({ currentUser, auth, login });

export default reducers;
