/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import SocialAuth from '../Login/socialAuth';
import socialAuth, {
  handleShowAndHide,
  getUserDetails,
} from '../../actions/socialAuth';
import { getUserFollowersDetails } from '../../actions/profile';
import defaultAvatar from '../../assets/images/person.png';
import './Header.scss';
import { setIsLoggedOut } from '../../actions/logout';
import HeaderSearch from './HeaderSearch';
import logoImg from '../../assets/images/logo.png';

const history = createBrowserHistory();

export class Header extends Component {
  state = {
    menu: false,
    dropdown: false,
  };

  componentDidMount = () => {
    const {
      location,
      _socialAuth: socialAuthAction,
      _getUserDetails,
      _getUserFollowersDetails,
    } = this.props;
    const url = location.search;
    const userData = queryString.parse(url);
    const { token, user } = userData;
    const username = localStorage.getItem('username');
    const localToken = localStorage.getItem('token');

    try {
      if (user && !localToken) {
        socialAuthAction(token, JSON.parse(user));
        _getUserFollowersDetails(JSON.parse(user).user.username);
        localStorage.setItem('username', JSON.parse(user).user.username);
        history.push('/');
      } else if (username) {
        _getUserDetails(username);
        _getUserFollowersDetails(username);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    window.addEventListener('click', (e) => {
      const { dropdown } = this.state;
      if (
        e.target?.parentNode?.className !== 'user-info__avatar'
        && e.target?.parentNode?.className
        && !e.target?.parentNode?.className?.includes('header-popup')
        && dropdown
      ) {
        this.setState({ dropdown: false });
      }
    });
  };

  toggleMenu = () => {
    const { menu } = this.state;
    this.setState({
      menu: !menu,
    });
  };

  logout = () => {
    const { _logout } = this.props;
    _logout();
    window.location.href = '/';
  };

  toggleDropdown = () => {
    const { dropdown } = this.state;
    this.setState({
      dropdown: !dropdown,
    });
  };

  renderUser = () => {
    const {
      isAuth,
      user: currentUser,
      _handleShowAndHide,
      history: _history,
    } = this.props;
    const { menu, dropdown } = this.state;
    if (isAuth) {
      return (
        <div className="user-info">
          {false ? (
            <>
              <div className="user-info__notif">
                <span className="counter">12</span>
                <i className="fas fa-bell" alt="" />
              </div>
              <div className="user-info__message">
                <span className="counter">12</span>
                <i className="fas fa-envelope" alt="" />
              </div>
            </>
          ) : null}

          <div className="user-info__avatar" alt="">
            <img
              role="presentation"
              src={currentUser ? currentUser.picture : defaultAvatar}
              className="dropdown-img"
              alt=""
              onClick={this.toggleDropdown}
            />
            <div className={`header-popup ${dropdown ? 'show' : 'hide'}`}>
              {currentUser && (
                <p className="header-popup__username">{currentUser.username}</p>
              )}
              <p
                className="header-popup__profile"
                onClick={() => _history.push(`/profiles/${currentUser.username}`)}
              >
                Profile
              </p>
              <p onClick={this.logout} className="header-popup__logout">
                Logout
              </p>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className={`collapse navbar-collapse ${menu ? 'show' : ''}`}>
        <ul className="navbar-nav mr-auto">
          <li className="nav-link">
            <button
              type="button"
              onClick={() => _handleShowAndHide(true)}
              className="nav-link login-btn"
            >
              LOGIN
            </button>
          </li>
        </ul>
      </div>
    );
  };

  render() {
    const {
      location: { pathname },
    } = this.props;

    return (
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-white">
        <div id="sticky-nav" className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logoImg} alt="logo" className="rounded-circle logo" />
            {/* <span className="font-weight-lighter brand">Tech Community</span> */}
          </Link>
          <HeaderSearch history={history} />
          <SocialAuth url={pathname} />
          {this.renderUser()}
          <button
            onClick={this.toggleMenu}
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>
      </nav>
    );
  }
}

export const mapStateToProps = ({ currentUser: { user, isAuth } }) => ({
  isAuth,
  user,
});

export const mapDispatchToProps = (dispatch) => ({
  _socialAuth: (token, user) => dispatch(socialAuth(token, user)),
  _handleShowAndHide: (show) => dispatch(handleShowAndHide(show)),
  _logout: () => dispatch(setIsLoggedOut()),
  _getUserDetails: (username) => dispatch(getUserDetails(username, true)),
  _getUserFollowersDetails: (username) => dispatch(getUserFollowersDetails(username, true)),
});

Header.propTypes = {
  isAuth: PropTypes.bool,
  user: PropTypes.object,
  location: PropTypes.any,
  _socialAuth: PropTypes.func,
  _handleShowAndHide: PropTypes.func,
  _logout: PropTypes.func,
  _getUserDetails: PropTypes.func,
  _getUserFollowersDetails: PropTypes.func,
  history: PropTypes.any,
};

Header.defaultProps = {
  isAuth: false,
  user: {},
  location: {},
  _socialAuth: () => '',
  _handleShowAndHide: () => '',
  _logout: () => '',
  _getUserDetails: () => '',
  _getUserFollowersDetails: () => '',
  history: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
