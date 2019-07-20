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
import Signup from '../pages/Signup/Signup';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound/NotFound';

export const Routes = ({ isAuth }) => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/protected"
        render={props =>
          isAuth ? <Home {...props} /> : <Redirect to="/login" />
        }
      />

      <Route
        exact
        path="/login"
        render={props => (!isAuth ? <Login {...props} /> : <Redirect to="/" />)}
      />

      <Route
        exact
        path="/signup"
        render={props =>
          !isAuth ? <Signup {...props} /> : <Redirect to="/" />
        }
      />

      <Route exact path="*" component={NotFound} />
    </Switch>
  </Router>
);

Routes.propTypes = {
  isAuth: PropTypes.bool,
};

Routes.defaultProps = {
  isAuth: false,
};

export const mapStateToProps = ({ currentUser: { isAuth } }) => ({
  isAuth,
});

export default connect(mapStateToProps)(Routes);
