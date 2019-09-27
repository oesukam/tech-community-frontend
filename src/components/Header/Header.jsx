import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import Modal from '../Modal/Modal';
import google from '../../assets/images/google.png';
import github from '../../assets/images/github.png';
import socialAuth from '../../actions/socialAuth';
import './Header.scss';

export class Header extends Component {
  state = {
    menu: false,
    showModal: false,
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

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  login = platform => {
    window.location.replace(
      `http://${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/${platform}`,
    );
  };

  renderUser = () => {
    const {
      isAuth,
      user,
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
            {user.user && <img src={user.user.picture} alt="User avatar" />}
          </div>
        </div>
      );
    }
    return (
      <div className={`collapse navbar-collapse ${menu ? 'show' : ''}`}>
        <ul className="navbar-nav mr-auto">
          <li
            className={`nav-link ${path === '/signup' ? 'active' : ''}`}
            onClick={this.showModal}
          >
            <button className="nav-link login-btn">SIGNUP</button>
          </li>
          <li
            className={`nav-link ${path === '/login' ? 'active' : ''}`}
            onClick={this.showModal}
          >
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
          <Modal show={this.state.showModal} handleClose={this.hideModal}>
            <div className="social-auth">
              <p>Authentication</p>
              <span>Use your favorite platform to login</span>
              <div className="social-login-btn">
                <button
                  className="social-login-google"
                  onClick={() => this.login('google')}
                >
                  <img src={google} alt="" />
                  <span>LOGIN WITH GOOGLE</span>
                </button>
                <button
                  className="social-login-github"
                  onClick={() => this.login('github')}
                >
                  <img src={github} alt="" />
                  <span>LOGIN WITH GITHUB</span>
                </button>
              </div>
            </div>
          </Modal>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
