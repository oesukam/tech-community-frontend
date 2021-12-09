import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Web3 from 'web3';
// import { ethers } from 'ethers';
import Modal from '../Modal/Modal';
import { handleShowAndHide } from '../../actions/socialAuth';
import google from '../../assets/images/google.png';
// import github from '../../assets/images/github.png';
import './socialAuth.scss';

class SocialAuth extends Component {
  state = {
    web3: null,
  };

  async componentDidMount() {
    if (!window.ethereum) {
      window.alert('Please install MetaMask first.');
      throw new Error('No crypto wallet found. Please install it.');
    }

    // Request account access if needed
    await window.ethereum.enable();

    const web3 = new Web3(window.ethereum);

    this.setState({ web3 });
  }

  login = async () => {
    const { web3 } = this.state;

    const coinbase = await web3?.eth.getCoinbase();
    if (!coinbase) {
      window.alert('Please activate MetaMask first.');
      return;
    }

    const publicAddress = coinbase.toLowerCase();
    console.log({ publicAddress });

    // TODO: call the backend to get the nonce using the publicAddress

    const signiture = await this.handleSignMessage({
      publicAddress,
      nonce: 'nonce',
    });
    console.log({ signiture });

    // TODO: Authenticate to the backend using the signiture and the publicAddress
  };

  handleSignMessage = async ({ publicAddress, nonce }) => {
    const { web3 } = this.state;
    try {
      const message = web3.utils.utf8ToHex(
        `I am signing my one-time nonce: ${nonce}`,
      );
      const signature = await web3.eth.personal.sign(message, publicAddress);

      return signature;
    } catch (error) {
      console.log({ error });
      return error;
    }
  };

  showModal = () => {
    const { _handleShowAndHide } = this.props;
    _handleShowAndHide(true);
  };

  hideModal = () => {
    const { _handleShowAndHide } = this.props;
    _handleShowAndHide(false);
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
              type="button"
              className="social-login-google"
              onClick={() => this.login('google')}
            >
              <img src={google} alt="" />
              <span>CONNECT WITH YOUR WALLET</span>
            </button>
            {/* <button
              type="button"
              className="social-login-github"
              onClick={() => this.login('github')}
            >
              <img src={github} alt="" />
              <span>LOGIN WITH GITHUB</span>
            </button> */}
          </div>
        </div>
      </Modal>
    );
  }
}

export const mapStateToProps = ({ socialAuth: { show } }) => ({
  show,
});

export const mapDispatchToProps = (dispatch) => ({
  _handleShowAndHide: (show) => dispatch(handleShowAndHide(show)),
});

SocialAuth.propTypes = {
  _handleShowAndHide: PropTypes.func,
  text: PropTypes.string,
  show: PropTypes.bool,
  // url: PropTypes.string,
};

SocialAuth.defaultProps = {
  _handleShowAndHide: () => '',
  text: '',
  show: false,
  // url: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialAuth);
