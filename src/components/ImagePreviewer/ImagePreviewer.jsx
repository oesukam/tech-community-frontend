import React from 'react';
import './ImagePreviewer.scss';

export default ({ image, style, onClick }) => {
  return (
    <div className="image-previewer" style={style} onClick={onClick}>
      <img src={image} alt="preview" />
    </div>
  );
};
