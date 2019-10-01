import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal/Modal';
import { handleShowAndHide } from '../../actions/socialAuth';
import google from '../../assets/images/google.png';
import github from '../../assets/images/github.png';
import './socialAuth.scss';

class SocialAuth extends Component {
  state = {};
  login = platform => {
    window.location.replace(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/${platform}`,
    );
  };

  showModal = () => {
    const { handleShowAndHide } = this.props;
    handleShowAndHide(true);
  };

  hideModal = () => {
    const { handleShowAndHide } = this.props;
    handleShowAndHide(false);
  };

  render() {
    const { show, text = 'Use your favorite platform to login' } = this.props;
    return (
      <Modal show={show} handleClose={this.hideModal}>
        <div className="social-auth">
          <p>Authentication</p>
          <span>{text}</span>
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
    );
  }
}

export const mapStateToProps = ({ socialAuth: { show } }) => ({
  show,
});

export const mapDispatchToProps = dispatch => ({
  handleShowAndHide: show => dispatch(handleShowAndHide(show)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SocialAuth);
