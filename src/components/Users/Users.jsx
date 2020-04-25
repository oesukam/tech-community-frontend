import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLatestUsers } from '../../actions/usersActions';
import './Users.scss';
import PersonPlaceholder from '../../assets/images/person.png';
import Button from '../Button/Button';
import ContentLoader from '../Helpers/ContentLoader';

export class Users extends Component {
  componentDidMount() {
    const { onGetLatestUsers } = this.props;
    onGetLatestUsers();
  }

  render() {
    const {
      users,
      history: { push },
      loading,
    } = this.props;
    return (
      <div className="latest-users">
        {loading && <ContentLoader count={5} />}

        {users.map(({ _id, username, picture }) => (
          <div className="user" key={_id}>
            <img src={picture || PersonPlaceholder} alt="" />
            <div className="info">
              <div className="name">{username}</div>
              <Button
                text="VIEW PROFILE"
                style={{ fontSize: '.6em', padding: '6px' }}
                onClick={() => push(`/profiles/${username}`)}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

Users.propTypes = {
  onGetLatestUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export const mapStateToProps = ({ users: { items: users, loading } }) => ({
  users,
  loading,
});

export const mapDispatchToProps = (dispatch) => ({
  onGetLatestUsers: () => dispatch(getLatestUsers()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);
