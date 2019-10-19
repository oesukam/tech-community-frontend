import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import './SharePost.scss';
import facebookLogo from '../../assets/images/facebook_logo.png';
import twitterLogo from '../../assets/images/twitter_logo.png';
import { sharePost, clearSharePostContent } from '../../actions/sharePostAction';

const { REACT_APP_BACKEND_URL } = process.env;

export class SharePost extends Component {
  handleClick = (url, platform) => {
    const { _sharePost } = this.props;
    _sharePost({ url, platform });
  };

  render() {
    const { show, _clearSharePostContent, content: { url, title } } = this.props;
    const POST_URL = `${REACT_APP_BACKEND_URL}/${url}`;
    return (
      <Modal show={show} handleClose={_clearSharePostContent}>

        <div className="share-post">
          <header className="share-post__header">
            {title}
          </header>
          <div
            role="presentation"
            className="social_share"
            id="twitter"
            onClick={() => this.handleClick(url, 'twitter')}
          >
            <TwitterShareButton url={POST_URL} title={title}>
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
            onClick={() => this.handleClick(url, 'facebook')}
          >
            <FacebookShareButton url={POST_URL} title={title}>
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

const mapStateToProps = ({ sharePost: { show, content } }) => ({
  show, content,
});

const mapDispatchToProps = (dispatch) => ({
  _sharePost: (payload) => dispatch(sharePost(payload)),
  _clearSharePostContent: (payload) => dispatch(clearSharePostContent(payload)),
});

SharePost.propTypes = {
  show: PropTypes.bool,
  content: PropTypes.object,
  _sharePost: PropTypes.func,
  _clearSharePostContent: PropTypes.func,
};

SharePost.defaultProps = {
  show: false,
  content: { url: '' },
  _sharePost: () => '',
  _clearSharePostContent: () => '',
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SharePost);
