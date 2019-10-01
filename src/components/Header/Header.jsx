import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import SocialAuth from '../Login/socialAuth';
import socialAuth, { handleShowAndHide } from '../../actions/socialAuth';
import defaultAvatar from '../../assets/images/person.png';
import './Header.scss';

export class Header extends Component {
  state = {
    menu: false,
  };

  componentDidMount = () => {
    const { location, socialAuth: socialAuthAction } = this.props;
    const url = location.search;
    const userData = queryString.parse(url);
    const { token, user } = userData;

    try {
      if (user) {
        socialAuthAction(token, JSON.parse(user));
      }
    } catch (error) {
      console.log(error);
    }
  };

  toggleMenu = () => {
    this.setState({
      menu: !this.state.menu,
    });
  };

  renderUser = () => {
    const {
      isAuth,
      user,
      handleShowAndHide,
      match: { path },
    } = this.props;
    const { menu } = this.state;
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
                src={user.user ? user.user.picture : defaultAvatar}
                alt="User avatar"
              />
            }
          </div>
        </div>
      );
    }
    return (
      <div className={`collapse navbar-collapse ${menu ? 'show' : ''}`}>
        <ul className="navbar-nav mr-auto">
          <li className="nav-link" onClick={() => handleShowAndHide(true)}>
            <button className="nav-link signup-btn">SIGNUP</button>
          </li>
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

export const mapStateToProps = ({ currentUser: { user, isAuth } }) => ({
  isAuth,
  user,
});

export const mapDispatchToProps = dispatch => ({
  socialAuth: (token, user) => dispatch(socialAuth(token, user)),
  handleShowAndHide: show => dispatch(handleShowAndHide(show)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
