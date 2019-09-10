import React from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';

const Modal = ({ handleClose, show, children }) => {
  return (
    <div className="modal" style={{ display: show ? 'flex' : 'none' }}>
      <div className="dismiss" onClick={handleClose}>
        <span>&times;</span>
      </div>
      <div className="modal-dismiss" onClick={handleClose} />
      <section className="modal-main">{children}</section>
    </div>
  );
};

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

Modal.defaultProps = {
  children: null,
};

export default Modal;
