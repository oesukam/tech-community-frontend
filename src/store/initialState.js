module.exports = {
  auth: {
    loading: false,
    error: null,
  },
  currentUser: {
    isAuth: localStorage.getItem('tech_community_token') !== null,
    user: {},
  },
};
