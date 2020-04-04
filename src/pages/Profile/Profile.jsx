import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../containers/Layout/Layout';
import UserProfile from '../../components/UserProfile/UserProfile';
import './Profile.scss';

const Profile = ({ match, location }) => (
  <Layout match={match} location={location}>
    <div className="container-fluid profile">
      <UserProfile />
    </div>
  </Layout>
);

Profile.propTypes = {
  match: PropTypes.any,
  location: PropTypes.any,
};

Profile.defaultProps = {
  match: {},
  location: {},
};

export default Profile;
