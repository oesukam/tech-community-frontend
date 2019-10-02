import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal/Modal';
import './SharePost.scss';
import facebook_logo from '../../assets/images/facebook_logo.png';
import twitter_logo from '../../assets/images/twitter_logo.png';
import PropTypes from 'prop-types';

import { FRONTEND_BASE_URL } from '../../constants';

import share from '../../actions/sharePostAction';

import {
  FacebookShareButton,
  TwitterShareButton,
  // LinkedinShareButton,
  // EmailShareButton,
} from 'react-share';

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
            className="social_share"
            id="twitter"
            onClick={() => this.handleClick(postSlug, 'twitter')}
          >
            <TwitterShareButton url={POST_URL}>
              <img
                src={twitter_logo}
                className="social_logo"
                alt="twitter_logo"
              />
              <p className="social_name">SHARE ON TWITTER</p>
            </TwitterShareButton>
          </div>

          <div
            className="social_share"
            id="facebook"
            onClick={() => this.handleClick(postSlug, 'facebook')}
          >
            <FacebookShareButton url={POST_URL}>
              <img
                src={facebook_logo}
                className="social_logo"
                alt="facebook_logo"
              />
              <p className="social_name">SHARE ON FACEBOOK</p>
            </FacebookShareButton>
          </div>

          {/* <div className="social_share" id="facebook">
            <LinkedinShareButton url={POST_URL}>
              <img
                src={facebook_logo}
                className="social_logo"
                alt="facebook_logo"
              />
              <p className="social_name">SHARE ON LINKED IN</p>
            </LinkedinShareButton>
          </div>

          <div className="social_share" id="facebook">
            <EmailShareButton url={POST_URL}>
              <img
                src={facebook_logo}
                className="social_logo"
                alt="facebook_logo"
              />
              <p className="social_name">SHARE ON EMAIL</p>
            </EmailShareButton>
          </div> */}
        </div>
      </Modal>
    );
  }
}

// const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  share: data => dispatch(share(data)),
});

SharePost.propTypes = {
  show: PropTypes.bool,
  postSlug: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(SharePost);
