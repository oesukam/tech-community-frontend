import React, { Component } from 'react';
import './UserProfile.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cameraImage from '../../assets/images/camera.png';
import changeImage from '../../actions/userProfileAction';
import Loader from '../Loader/Loader';

export class UserProfile extends Component {
  handleChangeImage = (e) => {
    const image = e.target.files[0];
    const { change, username } = this.props;
    let validated = true;
    if (image.size > 5000000) {
      validated = false;
    }

    if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
      validated = false;
    }

    if (validated) change(image, username);
  };

  renderNoName = (firstName, lastName) => {
    if (
      (firstName !== '' || firstName !== null)
      && (lastName !== '' || lastName !== null)
    ) {
      return <span className="empty-name" />;
    }
    return (
      <p id="user-name">
        {firstName}
        {lastName}
      </p>
    );
  };

  renderProfileDetails = () => {
    const {
      firstName,
      lastName,
      username,
      followerCount,
      followedCount,
      picture,
    } = this.props;
    return (
      <div id="profile-container">
        <div id="profile-image-container">
          <img src={picture} id="profile-image" alt="" />

          <input
            style={{ display: 'none' }}
            type="file"
            onChange={this.handleChangeImage}
            ref={(imageInput) => {
              this.imageInput = imageInput;
            }}
          />

          <button
            type="submit"
            id="change-profile-image-button"
            onClick={() => this.imageInput.click()}
          >
            <img src={cameraImage} alt="" />
          </button>
        </div>

        <div id="profile-content">
          {this.renderNoName(firstName, lastName)}
          <p id="user-profession">{username}</p>
        </div>

        <div id="profile-footer">
          <p id="following">
            {followerCount}
            {' '}
            Followers
          </p>
          <p id="followers">
            {followedCount}
            {' '}
            Following
          </p>
        </div>
      </div>
    );
  };

  renderLeftBox = (children) => (
    <>
      <div className="left-column">
        {children}
      </div>
    </>
  )

  render() {
    const { loading, error } = this.props;

    if (loading) {
      return this.renderLeftBox(<Loader />);
    }

    if (error) {
      return this.renderLeftBox(
        <p id="error-message">
          Error...
          {error}
        </p>,
      );
    }

    return this.renderLeftBox(this.renderProfileDetails());
  }
}

UserProfile.propTypes = {
  change: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  username: PropTypes.string,
  followerCount: PropTypes.number,
  followedCount: PropTypes.number,
  picture: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

UserProfile.defaultProps = {
  firstName: '',
  lastName: '',
  username: '',
  followerCount: 0,
  followedCount: 0,
  picture: '',
  loading: false,
  error: '',
};

const mapStateToProps = ({
  currentUser: {
    user: {
      firstName, lastName, username, followerCount, followedCount, picture,
    },
  },
  userProfile: { loading, error },
}) => ({
  firstName,
  lastName,
  username,
  followerCount,
  followedCount,
  picture,
  loading,
  error,
});

const mapDispatchToProps = (dispatch) => ({
  change: (image, username) => dispatch(changeImage(image, username)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfile);
