import React from 'react';
import PropTypes from 'prop-types';
import ScrollAnimation from 'react-animate-on-scroll';

function Pagetitle({ title }) {
  return (
    <ScrollAnimation
      animateIn="fadeInUp"
      animateOut="fadeInOut"
      animateOnce
    >
      <h2 className="section-title"><span>{title}</span></h2>
    </ScrollAnimation>
  );
}

Pagetitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Pagetitle;
