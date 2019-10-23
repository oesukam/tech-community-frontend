import React from 'react';
import PropTypes from 'prop-types';
import './NotFound.scss';
import notFound from '../../assets/images/notFound.png';

const NotFound = ({ show, text }) => (
  <div className={`notFound ${show}-hide`}>
    <img src={notFound} width="50%" alt="Not Found" />
    <div className="text">
      <span>{text}</span>
    </div>
  </div>
);

NotFound.propTypes = {
  show: PropTypes.bool,
  text: PropTypes.string,
};

NotFound.defaultProps = {
  show: true,
  text: 'Not Found!',
};

export default NotFound;
