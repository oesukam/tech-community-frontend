module.exports = {
  currentUser: {
    isAuth: localStorage.getItem('token') !== null,
    user: {},
  },
  feed: {
    items: [],
  },
  search: {
    searchKeywords: '',
    searchItems: [],
    searchState: {
      query: '',
    },
  },
  posts: {
    share: {
      show: false,
      url: '',
      title: '',
      contentn: '',
    },
  },
};
