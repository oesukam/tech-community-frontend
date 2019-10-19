import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import './Layout.scss';

const Layout = ({
  children, match, location, history,
}) => (
  <>
    <Header match={match} location={location} history={history} />
    <div className="main-content">{children}</div>
  </>
);

Layout.propTypes = {
  children: PropTypes.any,
  match: PropTypes.any,
  location: PropTypes.any,
  history: PropTypes.any,
};

Layout.defaultProps = {
  children: '',
  match: { params: {} },
  location: {},
  history: {},
};

export default Layout;
