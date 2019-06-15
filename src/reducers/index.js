import { combineReducers } from 'redux';
import currentUser from './currentUser';
import auth from './signup';

const reducers = combineReducers({ currentUser, auth });

export default reducers;
