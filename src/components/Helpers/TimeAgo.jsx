import React from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import PropTypes from 'prop-types';


const TimeAgo = ({ date, style }) => <span style={style}>{moment(date).fromNow()}</span>;

TimeAgo.propTypes = {
  date: PropTypes.string,
  style: PropTypes.object,
};

TimeAgo.defaultProps = {
  date: '',
  style: {},
};

export default TimeAgo;
