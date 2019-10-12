import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import './Layout.scss';

const Layout = ({ children, match, location }) => (
  <>
    <Header match={match} location={location} />
    <div className="main-content">{children}</div>
  </>
);

Layout.propTypes = {
  children: PropTypes.any,
  match: PropTypes.any,
  location: PropTypes.any,
};

Layout.defaultProps = {
  children: '',
  match: { params: {} },
  location: {},
};

export default Layout;
