import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.scss';

export class Header extends Component {
  state = {
    menu: false,
  };

  toggleMenu = () => {
    this.setState({
      menu: !this.state.menu,
    });
  };

  renderUser = () => {
    const {
      isAuth,
      match: { path },
    } = this.props;
    const { menu } = this.state;

    if (!isAuth) {
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
          <div className="user-info__avatar" alt="User avatar" />
        </div>
      );
    }
    return (
      <div className={`collapse navbar-collapse ${menu ? 'show' : ''}`}>
        <ul className="navbar-nav mr-auto">
          <li className={`nav-link ${path === '/signup' ? 'active' : ''}`}>
            <Link className="nav-link" to="/signup">
              SIGNUP
            </Link>
          </li>
          <li className={`nav-link ${path === '/login' ? 'active' : ''}`}>
            <Link className="nav-link" to="/login">
              LOGIN
            </Link>
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

export default connect(mapStateToProps)(Header);
