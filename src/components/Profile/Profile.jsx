import './profile.scss';
import React, { Component } from 'react';
import Header from '../Header/Header';

export class Profile extends Component {
  render() {
    return (
      <>
        <Header location={this.props.location} history={this.props.history} />
        <div className="row profile">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <div className="profile__details">
              <div className="belt row title">
                <h3>Profile</h3>
                <i class="fas fa-pen"></i>
              </div>

              <div className="profile__details--names row belt">
                <div className="names__first col-lg-4">
                  <span>First name</span>
                  <p>Prémices</p>
                </div>
                <div className="names__last col-lg-4">
                  <span>Last name</span>
                  <p>Kamasuwa</p>
                </div>
                <div className="names__middle col-lg-4">
                  <span>Middle name</span>
                  <p>Nzanzu</p>
                </div>
              </div>
              <div className="profile__details--addresses row belt">
                <div className="addresses__email col-lg-4">
                  <span>Email</span>
                  <p>premices.tuvere@gmail.com</p>
                </div>
                <div className="addresses__username col-lg-4">
                  <span>username</span>
                  <p>nkpremices</p>
                </div>
                <div className="addresses__website col-lg-4">
                  <span>website</span>
                  <p>
                    <a href="website.domain.com">website.domain.com</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="profile__social">
              <div className="belt row title title__social">
                <h5>Social</h5>
                <i class="fas fa-pen"></i>
              </div>
              <div className="row belt">
                <div className="profile__social--facebook col-lg-3">
                  <span>Facebook</span>
                  <p>premices</p>
                </div>
                <div className="profile__social--linkedIn col-lg-3">
                  <span>LinkedIn</span>
                  <p>PTuvere</p>
                </div>
                <div className="profile__social--github col-lg-3">
                  <span>GitHub</span>
                  <p>nkpremices</p>
                </div>
                <div className="profile__social--twitter col-lg-3">
                  <span>Twitter</span>
                  <p>premices</p>
                </div>
              </div>
            </div>
            <div className="profile__location">
              <div className="belt row title">
                <h5>Location</h5>
                <i class="fas fa-pen"></i>
              </div>
              <div className="row belt">
                <div className="col-lg-4 profile__location--country">
                  <span>Country</span>
                  <p>DR Congo</p>
                </div>
                <div className="col-lg-4 profile__location--city">
                  <span>City</span>
                  <p>Goma</p>
                </div>
                <div className="col-lg-4 profile__location--province">
                  <span>Province</span>
                  <p>N kivu</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3"></div>
        </div>
      </>
    );
  }
}

export default Profile;
