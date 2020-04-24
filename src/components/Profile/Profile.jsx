import './profile.scss';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../containers/Layout/Layout';
import defaultAvatar from '../../assets/images/person.png';
import Button from '../Button/Button';

const followButtonStyle = {
  paddingTop: '3px',
  paddingBottom: '3px',
  padding: '10px',
  fontSize: '1rem',
  width: '100%',
};

export const Profile = ({
  details,
  location,
  history,
  match,
}) => (
  <Layout match={match} location={location} history={history}>
    <div className="container-fluid">
      <div className="row profile">
        <div className="col-md-3">
          <div className="profile__user">
            <img
              className="profile__user__avatar"
              src={details.picture || defaultAvatar}
              alt="My avatar"
            />
            <div className="profile__user__counters">
              <div className="profile__user__counters__followers">
                <span>{details.followersCount || 0}</span>
                <p>Followers</p>
              </div>
              <div className="profile__user__counters__following">
                <span>{details.followingCount || 0}</span>
                <p>Following</p>
              </div>
            </div>
            <Button
              style={followButtonStyle}
              text="Follow"
              disabled
            />
          </div>
          <div className="profile__links">
            <div className="container profile__link-item">
              <i className="fa fa-globe" />
              <span>General Settings</span>
            </div>
            <div className="container profile__link-item">
              <i className="fa fa-globe" />
              <span>Education</span>
            </div>
            <div className="container profile__link-item">
              <i className="fa fa-globe" />
              <span>Professional</span>
            </div>
            <div className="container profile__link-item">
              <i className="fa fa-globe" />
              <span>Projects</span>
            </div>
            <div className="container profile__link-item">
              <i className="fa fa-globe" />
              <span>Publications</span>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="profile__details">
            <div className="belt row title">
              <h3>Profile</h3>
              <i className="fas fa-pen" />
            </div>

            <div className="profile__details--names row belt">
              <div className="names__first col-lg-4">
                <span>First name</span>
                <p>
                  {details && details.firstName ? details.firstName : ''}
                  &nbsp;
                </p>
              </div>
              <div className="names__last col-lg-4">
                <span>Last name</span>
                <p>
                  {details && details.lastName ? details.lastName : ''}
                  &nbsp;
                </p>
              </div>
              <div className="names__middle col-lg-4">
                <span>Middle name</span>
                <p>
                  {details && details.middleName ? details.middleName : ''}
                  &nbsp;
                </p>
              </div>
            </div>
            <div className="profile__details--addresses row belt">
              <div className="addresses__email col-lg-4">
                <span>Email</span>
                <p className="font-lighter">
                  {details ? details.email : ''}
                  &nbsp;
                </p>
              </div>
              <div className="addresses__username col-lg-4">
                <span>username</span>
                <p>
                  {details ? details.username : ''}
                  &nbsp;
                </p>
              </div>
              <div className="addresses__website col-lg-4">
                <span>website</span>
                <p>
                  <a href={details && details.website ? details.website : '#'}>
                    {details && details.website ? details.website : ''}
                    &nbsp;
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="profile__social">
            <div className="belt row title title__social">
              <h5>Social</h5>
              <i className="fas fa-pen" />
            </div>
            <div className="row belt">
              <div className="profile__social--facebook col-lg-3">
                <span>Facebook</span>
                <p>
                  {details && details.facebook ? details.facebook : ''}
                  &nbsp;
                </p>
              </div>
              <div className="profile__social--linkedIn col-lg-3">
                <span>LinkedIn</span>
                <p>
                  {details && details.linkedIn ? details.LinkedIn : ''}
                  &nbsp;
                </p>
              </div>
              <div className="profile__social--github col-lg-3">
                <span>GitHub</span>
                <p>
                  {details && details.github ? details.github : ''}
                  &nbsp;
                </p>
              </div>
              <div className="profile__social--twitter col-lg-3">
                <span>Twitter</span>
                <p>
                  {details && details.twitter ? details.twitter : ''}
                  &nbsp;
                </p>
              </div>
            </div>
          </div>
          <div className="profile__location">
            <div className="belt row title">
              <h5>Location</h5>
              <i className="fas fa-pen" />
            </div>
            <div className="row belt">
              <div className="col-lg-4 profile__location--country">
                <span>Country</span>
                <p>
                  {details && details.country ? details.country : ''}
                  &nbsp;
                </p>
              </div>
              <div className="col-lg-4 profile__location--city">
                <span>City</span>
                <p>
                  {details && details.city ? details.city : ''}
                  &nbsp;
                </p>
              </div>
              <div className="col-lg-4 profile__location--province">
                <span>Province</span>
                <p>
                  {details && details.province ? details.province : ''}
                  &nbsp;
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="profile__following-list">
            <div className="container following-list__title">
              <h5>Following</h5>
            </div>
            <hr />
            <div className="container following-list__content">
              <div className="card-custom">
                <img
                  src={defaultAvatar}
                  alt="avatar"
                  className="card-custom__img"
                />

                <div className="container card-custom__name">
                  <h5>
                    John Doe
                  </h5>
                  <p className="text-muted text-lighter">Person</p>
                </div>
              </div>
              <div className="card-custom">
                <img
                  src={defaultAvatar}
                  alt="avatar"
                  className="card-custom__img"
                />

                <div className="container card-custom__name">
                  <h5>
                    John Doe
                  </h5>
                  <p className="text-muted text-lighter">Person</p>
                </div>
              </div>

            </div>
            <hr />
            <div className="following-list__more">See more</div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

Profile.propTypes = {
  details: PropTypes.object,
  location: PropTypes.any,
  history: PropTypes.any,
  match: PropTypes.any,
};

Profile.defaultProps = {
  details: {},
  location: {},
  history: {},
  match: {},
};

export const mapStateToProps = ({ currentUser: { user: details } }) => ({
  details,
});

export default connect(
  mapStateToProps,
)(Profile);
