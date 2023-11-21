import PropTypes from 'prop-types';
import React from 'react';

function Footer({ light }) {
  return (
    <footer className={light ? 'footer light' : 'footer'}>
      <div className="container">
        <span className="copyright">
          &copy;
          {' '}
          {new Date().getFullYear()}
          {' '}
          Andrew Zelenets.
        </span>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  light: false,
};

Footer.propTypes = {
  light: PropTypes.bool,
};

export default Footer;
