import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import SinglePost from '../pages/SinglePost/SinglePost';
import Profile from './Profile/Profile';
import SharePost from './SharePost/SharePost';

export const Routes = ({ isAuth, showShare }) => (
  <Router>
    <SharePost show={showShare} />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/posts/:slug" component={SinglePost} />
      <Route
        exact
        path="/protected"
        render={(props) => (isAuth ? <Home {...props} /> : <Redirect to="/login" />)}
      />
      <Route exact path="/profile" render={(props) => (isAuth ? <Profile {...props} /> : <Redirect to="/" />)} />

      <Route exact path="*" component={NotFound} />
    </Switch>
  </Router>
);

Routes.propTypes = {
  isAuth: PropTypes.bool,
  showShare: PropTypes.bool,
};

Routes.defaultProps = {
  isAuth: false,
  showShare: false,
};

export const mapStateToProps = ({
  currentUser: { isAuth },
  sharePost: { show: showShare },
}) => ({
  isAuth,
  showShare,
});

export default connect(mapStateToProps)(Routes);
