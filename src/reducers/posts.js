import {
	POST_ERROR,
	POST_SUCCESS,
	POST_STARTED,
} from '../actionTypes/postTypes';

/**
 * Login reducer
 * @param {*} [state=auth]
 * @param {*} { type, payload }
 * @returns {object} updated state
 */
const postReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case POST_STARTED:
			return {
				...state,
				loading: true,
			};
		case POST_SUCCESS:
			return {
				...state,
				post: payload,
				loading: false,
				error: false,
			};
		case POST_ERROR:
			return {
				...state,
				loading: false,
				error: payload,
				loggedIn: false,
			};
		default:
			return state;
	}
};

export default postReducer;
