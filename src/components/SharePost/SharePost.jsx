import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import './SharePost.scss';
import facebookLogo from '../../assets/images/facebook_logo.png';
import twitterLogo from '../../assets/images/twitter_logo.png';

import { FRONTEND_BASE_URL } from '../../constants';

import shareAction from '../../actions/sharePostAction';


export class SharePost extends Component {
  handleClick = (postSlug, platform) => {
    const { share, handleClose } = this.props;
    share({ postSlug, platform });
    handleClose();
  };

  render() {
    const { show, handleClose, postSlug } = this.props;
    const POST_URL = `${FRONTEND_BASE_URL}/post/${postSlug}`;

    return (
      <Modal show={show} handleClose={handleClose}>
        <div className="share-post">
          <div
            role="presentation"
            className="social_share"
            id="twitter"
            onClick={() => this.handleClick(postSlug, 'twitter')}
          >
            <TwitterShareButton url={POST_URL}>
              <img
                src={twitterLogo}
                className="social_logo"
                alt="twitter_logo"
              />
              <p className="social_name">SHARE ON TWITTER</p>
            </TwitterShareButton>
          </div>

          <div
            role="presentation"
            className="social_share"
            id="facebook"
            onClick={() => this.handleClick(postSlug, 'facebook')}
          >
            <FacebookShareButton url={POST_URL}>
              <img
                src={facebookLogo}
                className="social_logo"
                alt="facebook_logo"
              />
              <p className="social_name">SHARE ON FACEBOOK</p>
            </FacebookShareButton>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  share: (data) => dispatch(shareAction(data)),
});

SharePost.propTypes = {
  show: PropTypes.bool,
  postSlug: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  share: PropTypes.func,
};

SharePost.defaultProps = {
  show: false,
  postSlug: '',
  share: () => '',
};

export default connect(
  null,
  mapDispatchToProps,
)(SharePost);
