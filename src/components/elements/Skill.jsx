import React from 'react';
import PropTypes from 'prop-types';

function Skill({ title, description }) {
  return (
    <li className="skill-item">
      <h4 className="mb-3 text-center-mobile">{title}</h4>
      <p className="mb-1">{description}</p>
    </li>
  );
}

Skill.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Skill;
