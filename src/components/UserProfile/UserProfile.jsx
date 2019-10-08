import React, { Component } from 'react';
import './UserProfile.scss';
import cameraImage from '../../assets/images/camera.png';
import { connect } from 'react-redux';
import changeImage from '../../actions/userProfileAction';

class UserProfile extends Component {
  handleChangeImage = e => {
    const image = e.target.files[0];
    const { changeImage } = this.props;

    if (image.size > 5000000) return alert('Image is too large');

    if (image.type !== 'image/png' && image.type !== 'image/jpeg')
      return alert('Only PNG or JPEG allowed');

    const fd = new FormData();
    fd.append('image', image, image.name);

    changeImage(fd);
  };

  render() {
    return (
      <React.Fragment>
        <div className="left-column">
          <div id="profile-container">
            <div id="profile-image-container">
              <img src="#" id="profile-image" alt="" />

              <input
                style={{ display: 'none' }}
                type="file"
                onChange={this.handleChangeImage}
                ref={imageInput => (this.imageInput = imageInput)}
              />

              <button
                id="change-profile-image-button"
                onClick={() => this.imageInput.click()}
              >
                <img src={cameraImage} alt="" />
              </button>
            </div>
            <div id="profile-content">
              <p id="user-name">Ellena Johnson</p>
              <p id="user-profession">Designer</p>
            </div>
            <div id="profile-footer">
              <p id="following">23 Followers</p>
              <p id="followers">25 Following</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changeImage: image => dispatch(changeImage(image)),
});

export default connect(
  null,
  mapDispatchToProps,
)(UserProfile);
