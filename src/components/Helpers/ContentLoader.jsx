import React from 'react';
import ReactContentLoader from 'react-content-loader';
import PropTypes from 'prop-types';

const ContentLoader = ({ style, count }) => [
  ...Array(count || 1)].map((value, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <div style={{ ...style, width: '100%' }} key={index}>
      <ReactContentLoader
        height={130}
        width={400}
        speed={2}
        primaryColor="#fff"
        secondaryColor="#e7f1fa"
      >
        <rect x="50" y="10" rx="4" ry="4" width="117" height="6" />
        <rect x="50" y="25" rx="3" ry="3" width="85" height="6" />
        <rect x="0" y="60" rx="3" ry="3" width="350" height="6" />
        <rect x="0" y="80" rx="3" ry="3" width="380" height="6" />
        <rect x="0" y="100" rx="3" ry="3" width="380" height="6" />
        <circle cx="20" cy="20" r="20" />
      </ReactContentLoader>
    </div>
));

ContentLoader.propTypes = {
  style: PropTypes.object,
};

ContentLoader.defaultProps = {
  style: {},
};
export default ContentLoader;
