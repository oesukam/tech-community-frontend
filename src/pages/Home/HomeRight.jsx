import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './HomeRight.scss';
import { Link } from 'react-router-dom';
import orgDefaultLogo from '../../assets/svg/organization.svg';

export class HomeRight extends Component {
  renderOrganizations = () => {
    const { organizations } = this.props;
    return organizations.map((org) => (
      <Link key={org.slug || org._id} to={org.slug || org._id} className="org-card">
        <img src={org.image || orgDefaultLogo} className="org-card__image" alt="Logo" />
        <div className="org-card__content">
          <h1 className="org-card__content__name">{org.name}</h1>
          <h1 className="org-card__content__category">{org.category}</h1>
        </div>
      </Link>
    ));
  }

  render() {
    return (
      <div className="side-container">
        <div className="side-container__header">Organization</div>
        {this.renderOrganizations()}
      </div>
    );
  }
}

HomeRight.propTypes = {
  organizations: PropTypes.array,
};

HomeRight.defaultProps = {
  organizations: [],
};

/**
 * Maps the state to props
 * @param {*} { auth }
 * @returns {object} props
 */
export const mapStateToProps = ({
  feed: {
    organizations,
  },
}) => ({ organizations });


export default connect(
  mapStateToProps,
)(HomeRight);
