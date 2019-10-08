import React, { Component } from 'react';
import Layout from '../../containers/Layout/Layout';
import UserProfile from '../../components/UserProfile/UserProfile';
import './Profile.scss';

class Profile extends Component {
  render() {
    const { match, location } = this.props;
    return (
      <Layout match={match} location={location}>
        <div className="container-fluid profile">
          <UserProfile />
        </div>
      </Layout>
    );
  }
}

export default Profile;
