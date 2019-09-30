import React from 'react';

import moment from 'moment';
import 'moment/locale/fr';

export default ({ date, style }) => {
  return <span style={style}>{moment(date).fromNow()}</span>;
};
