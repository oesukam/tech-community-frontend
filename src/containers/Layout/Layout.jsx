import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import './Layout.scss';

const Layout = ({ children, match, location, history }) => (
  <React.Fragment>
    <Header match={match} location={location} history={history} />
    <div className="main-content">{children}</div>
  </React.Fragment>
);

Layout.propTypes = {
  children: PropTypes.any,
  match: PropTypes.any,
};

Layout.defaultProps = {
  children: '',
  match: { params: {} },
};

export default Layout;
