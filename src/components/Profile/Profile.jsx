/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import './profile.scss';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from '../../containers/Layout/Layout';
import defaultAvatar from '../../assets/images/person.png';
import Button from '../Button/Button';
import { getUserDetails } from '../../actions/socialAuth';
import {
  resetFetchedMemberProfile,
  followUnflowUser,
  updateProfile,
  checkFollowActivity,
  getUserFollowersDetails,
} from '../../actions/profile';

const followButtonStyle = {
  paddingTop: '3px',
  paddingBottom: '3px',
  padding: '10px',
  fontSize: '1rem',
  width: '100%',
};

export const Profile = ({
  user,
  location,
  history,
  match,
  membersProfile,
  getUserDetails: getMembersDetails,
  resetFetchedMemberProfile: resetFetchedMember,
  followUnflowUser: followUnflow,
  updateProfile: updateUserProfile,
  checkFollowActivity: checkFollow,
  getUserFollowersDetails: getFollowers,
  isAuth,
}) => {
  const { username } = useParams();
  const details = user.username === username ? user : membersProfile;

  if (user.username !== username && !membersProfile.username) {
    getMembersDetails(username, false);
    getFollowers(username, false);
    checkFollow(username);
  }

  const [detailsState, setDetails] = useState(details);
  const [editMode, setEditMode] = useState({
    details: false,
    social: false,
    location: false,
  });

  // This unction will be called when the component unmounts
  useEffect(() => () => {
    resetFetchedMember();
  }, []);

  return (
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
                  <span>{details.followedCount || 0}</span>
                  <p>Following</p>
                </div>
              </div>
              {
                user.username !== username
                && membersProfile.username
                && isAuth
                && (
                  <Button
                    style={followButtonStyle}
                    text={`${!details.isFollowed ? '' : 'un'}follow`}
                    onClick={() => followUnflow(`${
                      !details.isFollowed ? '' : 'UN'
                    }FOLLOW_USER`, details.username)}
                  />
                )
              }
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
                {user.username
                  && user.username === username ? (
                    <i
                      className="fas fa-pen"
                      onClick={() => {
                        setDetails(details);
                        setEditMode({ ...editMode, details: true });
                      }}
                      style={{ display: editMode.details ? 'none' : 'block' }}
                    />
                  ) : ''}
              </div>

              <div className="profile__details--names row belt">
                <div className="names__first col-lg-4">
                  <span>First name</span>
                  {!editMode.details && (
                    <p>
                      {details && details.info ? details.info.firstName : ''}
                    &nbsp;
                    </p>
                  )}
                  {editMode.details && (
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={detailsState.info && detailsState.info.firstName ? detailsState.info.firstName : ''}
                      onChange={(e) => {
                        setDetails({
                          ...detailsState,
                          info: {
                            ...detailsState.info,
                            firstName: e.target.value,
                          },
                        });
                      }}
                    />
                  )}
                </div>
                <div className="names__last col-lg-4">
                  <span>Last name</span>
                  {!editMode.details && (
                    <p>
                      {details && details.info ? details.info.lastName : ''}
                    &nbsp;
                    </p>
                  )}
                  {editMode.details && (
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={detailsState.info && detailsState.info.lastName ? detailsState.info.lastName : ''}
                      onChange={(e) => {
                        setDetails({
                          ...detailsState,
                          info: { ...detailsState.info, lastName: e.target.value },
                        });
                      }}
                    />
                  )}
                </div>
                <div className="names__middle col-lg-4">
                  <span>Middle name</span>
                  {!editMode.details && (
                    <p>
                      {details && details.info ? details.info.middleName : ''}
                    &nbsp;
                    </p>
                  )}
                  {editMode.details && (
                    <input
                      type="text"
                      name="middleName"
                      id="middleName"
                      value={detailsState.info && detailsState.info.middleName ? detailsState.info.middleName : ''}
                      onChange={(e) => {
                        setDetails({
                          ...detailsState,
                          info: { ...detailsState.info, middleName: e.target.value },
                        });
                      }}
                    />
                  )}
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
                  {!editMode.details && (
                    <p>
                      <a href={details && details.website ? details.website : '#'}>
                        {details && details.website ? details.website : ''}
                      &nbsp;
                      </a>
                    </p>
                  )}
                  {editMode.details && (
                    <input
                      type="text"
                      name="website"
                      id="website"
                      value={detailsState.website}
                      onChange={(e) => {
                        setDetails({
                          ...detailsState,
                          website: e.target.value,
                        });
                      }}
                    />
                  )}
                </div>
              </div>
              {editMode.details && (
                <div className="row belt profile__buttons">
                  <button
                    type="submit"
                    className=""
                    onClick={() => {
                      setEditMode({ ...editMode, details: false });
                      updateUserProfile(username, {
                        person: {
                          firstName: detailsState.info.firstName,
                          lastName: detailsState.info.lastName,
                          middleName: detailsState.info.middleName,
                        },
                        user: { website: detailsState.website },
                      });
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="submit"
                    className=""
                    onClick={() => setEditMode({ ...editMode, details: false })}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            <div className="profile__social">
              <div className="belt row title title__social">
                <h5>Social</h5>
                {user.username
                  && user.username === username ? (
                    <i
                      className="fas fa-pen"
                      onClick={() => {
                        setDetails(details);
                        setEditMode({ ...editMode, social: true });
                      }}
                      style={{ display: editMode.social ? 'none' : 'block' }}
                    />
                  ) : ''}
              </div>
              <div className="row belt">
                <div className="profile__social--facebook col-lg-3">
                  <span>Facebook</span>
                  {!editMode.social && (
                    <p>
                      {details && details.facebook ? details.facebook : ''}
                    &nbsp;
                    </p>
                  )}
                  {editMode.social && (
                    <input
                      type="text"
                      name="facebook"
                      id="facebook"
                      value={detailsState.facebook}
                      onChange={(e) => {
                        setDetails({ ...detailsState, facebook: e.target.value });
                      }}
                    />
                  )}
                </div>
                <div className="profile__social--linkedIn col-lg-3">
                  <span>LinkedIn</span>
                  {!editMode.social && (
                    <p>
                      {details && details.linkedIn ? details.linkedIn : ''}
                    &nbsp;
                    </p>
                  )}
                  {editMode.social && (
                    <input
                      type="text"
                      name="LinkedIn"
                      id="LinkedIn"
                      value={detailsState.linkedIn}
                      onChange={(e) => {
                        setDetails({ ...detailsState, linkedIn: e.target.value });
                      }}
                    />
                  )}
                </div>
                <div className="profile__social--github col-lg-3">
                  <span>GitHub</span>
                  {!editMode.social && (
                  <p>
                    {details && details.github ? details.github : ''}
                    &nbsp;
                  </p>
                  )}
                  {editMode.social && (
                  <input
                    type="text"
                    name="github"
                    id="github"
                    value={detailsState.github}
                    onChange={(e) => {
                      setDetails({ ...detailsState, github: e.target.value });
                    }}
                  />
                  )}
                </div>
                <div className="profile__social--twitter col-lg-3">
                  <span>Twitter</span>
                  {!editMode.social && (
                  <p>
                    {details && details.twitter ? details.twitter : ''}
                    &nbsp;
                  </p>
                  )}
                  {editMode.social && (
                  <input
                    type="text"
                    name="twitter"
                    id="twitter"
                    value={detailsState.twitter}
                    onChange={(e) => {
                      setDetails({ ...detailsState, twitter: e.target.value });
                    }}
                  />
                  )}
                </div>
              </div>
              {editMode.social && (
                <div className="row belt profile__buttons">
                  <button
                    type="submit"
                    className=""
                    onClick={() => {
                      setEditMode({ ...editMode, social: false });
                      updateUserProfile(username, {
                        user: {
                          facebook: detailsState.facebook,
                          twitter: detailsState.twitter,
                          github: detailsState.github,
                          linkedIn: detailsState.linkedIn,
                        },
                      });
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="submit"
                    className=""
                    onClick={() => setEditMode({ ...editMode, social: false })}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            <div className="profile__location">
              <div className="belt row title">
                <h5>Location</h5>
                {user.username
                  && user.username === username ? (
                    <i
                      className="fas fa-pen"
                      onClick={() => {
                        setDetails(details);
                        setEditMode({ ...editMode, location: true });
                      }}
                      style={{ display: editMode.location ? 'none' : 'block' }}
                    />
                  ) : ''}
              </div>
              <div className="row belt">
                <div className="col-lg-4 profile__location--country">
                  <span>Country</span>
                  {!editMode.location && (
                  <p>
                    {details && details.country ? details.country : ''}
                    &nbsp;
                  </p>
                  )}
                  {editMode.location && (
                  <input
                    type="text"
                    name="country"
                    id="country"
                    value={detailsState.country}
                    onChange={(e) => {
                      setDetails({ ...detailsState, country: e.target.value });
                    }}
                  />
                  )}
                </div>
                <div className="col-lg-4 profile__location--city">
                  <span>City</span>
                  {!editMode.location && (
                  <p>
                    {details && details.city ? details.city : ''}
                    &nbsp;
                  </p>
                  )}
                  {editMode.location && (
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={detailsState.city}
                    onChange={(e) => {
                      setDetails({ ...detailsState, city: e.target.value });
                    }}
                  />
                  )}
                </div>
                <div className="col-lg-4 profile__location--province">
                  <span>Province</span>
                  {!editMode.location && (
                  <p>
                    {details && details.province ? details.province : ''}
                    &nbsp;
                  </p>
                  )}
                  {editMode.location && (
                  <input
                    type="text"
                    name="province"
                    id="province"
                    value={detailsState.province}
                    onChange={(e) => {
                      setDetails({ ...detailsState, province: e.target.value });
                    }}
                  />
                  )}
                </div>
              </div>
              {editMode.location && (
                <div className="row belt profile__buttons">
                  <button
                    type="submit"
                    className=""
                    onClick={() => {
                      setEditMode({
                        ...editMode,
                        location: false,
                      });
                      updateUserProfile(username, {
                        user: {
                          country: detailsState.country,
                          city: detailsState.city,
                          province: detailsState.province,
                        },
                      });
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="submit"
                    className=""
                    onClick={() => setEditMode({ ...editMode, location: false })}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-3">
            <div className="profile__following-list">
              <div className="container following-list__title">
                <h5>Following</h5>
              </div>
              <hr />
              <div className="container following-list__content">
                {details.following && details.following.map((person) => (
                  <div className="card-custom">
                    <img
                      src={person.user[0].picture || defaultAvatar}
                      alt="avatar"
                      className="card-custom__img"
                    />

                    <div className="container card-custom__name">
                      <h5>
                        <Link to={`/profiles/${person.user[0].username}`}>{person.user[0].username}</Link>
                      </h5>
                      <p className="text-muted text-lighter">{person.user[0].userType}</p>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
              <div className="following-list__more">See more</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
  location: PropTypes.any,
  history: PropTypes.any,
  match: PropTypes.any,
  membersProfile: PropTypes.any,
  getUserDetails: PropTypes.func,
  resetFetchedMemberProfile: PropTypes.func,
  followUnflowUser: PropTypes.func,
  isAuth: PropTypes.bool,
  updateProfile: PropTypes.func,
  checkFollowActivity: PropTypes.func,
  getUserFollowersDetails: PropTypes.func,
};

Profile.defaultProps = {
  user: {},
  location: {},
  history: {},
  match: {},
  membersProfile: {},
  getUserDetails: () => null,
  resetFetchedMemberProfile: () => null,
  followUnflowUser: () => null,
  isAuth: false,
  updateProfile: () => null,
  checkFollowActivity: () => null,
  getUserFollowersDetails: () => null,
};

export const mapStateToProps = ({ currentUser: { user, membersProfile } }) => ({
  user,
  membersProfile,
});

export default connect(
  mapStateToProps,
  {
    getUserDetails,
    resetFetchedMemberProfile,
    followUnflowUser,
    updateProfile,
    checkFollowActivity,
    getUserFollowersDetails,
  },
)(Profile);
