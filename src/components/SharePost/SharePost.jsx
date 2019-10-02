import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal/Modal';
import './SharePost.scss';
import facebook_logo from '../../assets/images/facebook_logo.png';
import twitter_logo from '../../assets/images/twitter_logo.png';
import PropTypes from 'prop-types';

import { FRONTEND_BASE_URL } from '../../constants';

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
} from 'react-share';

class SharePost extends Component {
  render() {
    const { show, handleClose, postSlug } = this.props;
    const POST_URL = `${FRONTEND_BASE_URL}/post/${postSlug}`;

    return (
      <Modal show={show} handleClose={handleClose}>
        <div className="share-post">
          <div className="social_share" id="twitter">
            <TwitterShareButton url={POST_URL}>
              <img
                src={twitter_logo}
                className="social_logo"
                alt="twitter_logo"
              />
              <p className="social_name">SHARE ON TWITTER</p>
            </TwitterShareButton>
          </div>

          <div className="social_share" id="facebook">
            <FacebookShareButton url={POST_URL}>
              <img
                src={facebook_logo}
                className="social_logo"
                alt="facebook_logo"
              />
              <p className="social_name">SHARE ON FACEBOOK</p>
            </FacebookShareButton>
          </div>

          <div className="social_share" id="facebook">
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
          </div>
        </div>
      </Modal>
    );
  }
}

// const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch => ({});

SharePost.propTypes = {
  show: PropTypes.bool,
};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(SharePost);
export default SharePost;
