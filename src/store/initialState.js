module.exports = {
  currentUser: {
    isAuth: localStorage.getItem('token') !== null,
    user: {},
  },
};
