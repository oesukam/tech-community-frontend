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
import defaultAvatar from '../../assets/images/person.png';
import './Header.scss';
import { setIsLoggedOut } from '../../actions/logout';

const history = createBrowserHistory();

export class Header extends Component {
  state = {
    menu: false,
    dropdown: false,
  };

  componentDidMount = () => {
    const { location, _socialAuth: socialAuthAction, _getUserDetails } = this.props;
    const url = location.search;
    const userData = queryString.parse(url);
    const { token, user } = userData;
    const username = localStorage.getItem('username');
    const localToken = localStorage.getItem('token');

    if (user && !localToken) {
      socialAuthAction(token, JSON.parse(user));
      history.push('/');
    } else if (username) {
      _getUserDetails(username);
    }

    window.addEventListener('click', (e) => {
      const { dropdown } = this.state;
      if (
        e.target.parentNode.className !== 'user-info__avatar'
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
      user,
      userDetails,
      _handleShowAndHide,
    } = this.props;
    const { menu, dropdown } = this.state;
    const currentUser = user.user ? user.user : userDetails;
    if (isAuth) {
      return (
        <div className="user-info">
          <div className="user-info__notif">
            <span className="counter">12</span>
            <i className="fas fa-bell" alt="User avatar" />
          </div>
          <div className="user-info__message">
            <span className="counter">12</span>
            <i className="fas fa-envelope" alt="User avatar" />
          </div>
          <div className="user-info__avatar" alt="User avatar">
            <img
              role="presentation"
              src={currentUser ? currentUser.picture : defaultAvatar}
              className="dropdown-img"
              alt="User avatar"
              onClick={this.toggleDropdown}
            />
            <div className={`header-popup ${dropdown ? 'show' : 'hide'}`}>
              {currentUser && (
                <p className="header-popup__username">{currentUser.username}</p>
              )}
              <p className="header-popup__profile">Profile</p>
              <p role="presentation" onClick={this.logout} className="header-popup__logout">
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
            <button type="button" onClick={() => _handleShowAndHide(true)} className="nav-link login-btn">LOGIN</button>
          </li>
        </ul>
      </div>
    );
  };

  render() {
    return (
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-white">
        <div id="sticky-nav" className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <div className="nav-search">
            <input type="search" placeholder="Search.." aria-label="Search" />
            <i className="fa fa-search" />
          </div>
          <SocialAuth />
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

export const mapStateToProps = ({
  currentUser: { user, isAuth, details: userDetails },
}) => ({
  isAuth,
  user,
  userDetails,
});

export const mapDispatchToProps = (dispatch) => ({
  _socialAuth: (token, user) => dispatch(socialAuth(token, user)),
  _handleShowAndHide: (show) => dispatch(handleShowAndHide(show)),
  _logout: () => dispatch(setIsLoggedOut()),
  _getUserDetails: (username) => dispatch(getUserDetails(username)),
});

Header.propTypes = {
  isAuth: PropTypes.bool,
  user: PropTypes.object,
  location: PropTypes.any,
  userDetails: PropTypes.object,
  _socialAuth: PropTypes.func,
  _handleShowAndHide: PropTypes.func,
  _logout: PropTypes.func,
  _getUserDetails: PropTypes.func,
};

Header.defaultProps = {
  isAuth: false,
  user: {},
  userDetails: {},
  location: {},
  _socialAuth: () => '',
  _handleShowAndHide: () => '',
  _logout: () => '',
  _getUserDetails: () => '',
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
