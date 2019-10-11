import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import queryString from 'query-string';
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
    const { location, socialAuth: socialAuthAction } = this.props;
    const url = location.search;
    const userData = queryString.parse(url);
    const { token, user } = userData;
    const username = localStorage.getItem('username');
    const localToken = localStorage.getItem('token');

    try {
      if (user && !localToken) {
        socialAuthAction(token, JSON.parse(user));
        history.push('/');
      } else if (username) {
        this.props.getUserDetails(username);
      }
    } catch (error) {
      console.log(error);
    }

    window.addEventListener('click', e => {
      if (
        e.target.parentNode.className !== 'user-info__avatar' &&
        !e.target.parentNode.className.includes('header-popup') &&
        this.state.dropdown
      ) {
        this.setState({ dropdown: false });
      }
    });
  };

  toggleMenu = () => {
    this.setState({
      menu: !this.state.menu,
    });
  };

  logout = () => {
    this.props.logout();
    window.location.href = '/';
  };

  toggleDropdown = () => {
    this.setState({
      dropdown: !this.state.dropdown,
    });
  };

  renderUser = () => {
    const {
      isAuth,
      user,
      userDetails,
      handleShowAndHide,
      // match: { path },
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
            {
              <img
                src={currentUser ? currentUser.picture : defaultAvatar}
                className="dropdown-img"
                alt="User avatar"
                onClick={this.toggleDropdown}
              />
            }
            <div className={`header-popup ${dropdown ? 'show' : 'hide'}`}>
              {currentUser && (
                <p className="header-popup__username">{currentUser.username}</p>
              )}
              <p
                className="header-popup__profile"
                onClick={() => this.props.history.push('/profile')}
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
          <li className="nav-link" onClick={() => handleShowAndHide(true)}>
            <button className="nav-link login-btn">LOGIN</button>
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

export const mapDispatchToProps = dispatch => ({
  socialAuth: (token, user) => dispatch(socialAuth(token, user)),
  handleShowAndHide: show => dispatch(handleShowAndHide(show)),
  logout: () => dispatch(setIsLoggedOut()),
  getUserDetails: username => dispatch(getUserDetails(username)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
