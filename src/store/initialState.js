module.exports = {
  currentUser: {
    isAuth: localStorage.getItem('token') !== null,
    user: {},
  },
  search: {
    searchKeywords: '',
    searchItems: [],
    searchState: {
      query: '',
    },
  },
};
