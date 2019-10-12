import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({
  error, text, loading, onClick, tick, style, disabled,
}) => (
  <>
    <button
      type="button"
      className={`reactive-button ${error ? 'reactive-button-error' : ''} ${disabled
        ? 'button-disabled' : ''}`}
      style={style}
      onClick={!disabled ? onClick : undefined}
    >
      <svg
        className="spinner"
        width="18px"
        height="18px"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: !loading && 'none' }}
      >
        <circle
          className="path"
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="30"
        />
      </svg>

      <span className="loading" style={{ display: !loading && 'none' }}>
        {text}
      </span>

      <span className="text" style={{ display: loading && 'none' }}>
        {error || text}
        {' '}
        {tick && <span className="tick">✓</span>}
      </span>
    </button>
  </>
);

Button.propTypes = {
  error: PropTypes.any,
  text: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  tick: PropTypes.bool,
  style: PropTypes.object,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  error: '',
  text: '',
  loading: false,
  onClick: () => '',
  tick: false,
  style: {},
  disabled: false,
};

export default Button;
