import React from 'react';
import PropTypes from 'prop-types';
import ScrollAnimation from 'react-animate-on-scroll';

function Pagetitle({ title }) {
  return (
    <>
      <ScrollAnimation
        animateIn="fadeInUp"
        animateOut="fadeInOut"
        animateOnce
      >
        <h2 className="section-title">{title}</h2>
      </ScrollAnimation>
      <div className="spacer" data-height="60" />
    </>
  );
}

Pagetitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Pagetitle;
