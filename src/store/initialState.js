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
  posts: {},
  sharePost: {
    show: false,
    content: {
      url: '',
      title: '',
      content: '',
    },
  },
  singlePost: {
    post: {
      author: {},
      slug: '',
      userType: '',
      description: '',
      likesCount: 0,
      createdAt: '',
    },
    relatedPosts: {
      isEmpty: false,
      feed: [],
    },
  },
};
