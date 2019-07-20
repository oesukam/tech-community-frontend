module.exports = {
  auth: {
    loading: false,
    error: null,
  },
  login: {
    loading: false,
    error: null,
  },
  currentUser: {
    isAuth: localStorage.getItem('token') !== null,
    user: {},
  },
};
