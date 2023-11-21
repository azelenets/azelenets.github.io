import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Logo({ logoSource, bootstrapNav }) {
  if (bootstrapNav) {
    return (
      <Link className="navbar-brand" to="/">
        <img src={logoSource} alt="Bolby" />
      </Link>
    );
  }

  return (
    <div className="site-logo">
      <Link to="/">
        <img src={logoSource} alt="Bolby" />
      </Link>
    </div>
  );
}

Logo.defaultProps = {
  bootstrapNav: false,
};

Logo.propTypes = {
  logoSource: PropTypes.string.isRequired,
  bootstrapNav: PropTypes.bool,
};

export default Logo;
