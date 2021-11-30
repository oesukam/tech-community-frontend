import React from 'react';
import './ImagePreviewer.scss';
import PropTypes from 'prop-types';

const ImagePreviewer = ({ image, style, onClick }) => (
  <div role="presentation" className="image-previewer" style={style} onClick={onClick}>
    <img src={image} alt="preview" />
  </div>
);

ImagePreviewer.propTypes = {
  image: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

ImagePreviewer.defaultProps = {
  image: '',
  style: {},
  onClick: () => '',
};

export default ImagePreviewer;
