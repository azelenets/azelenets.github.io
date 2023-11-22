import React from 'react';
import PropTypes from 'prop-types';

function Testimonial({ slider }) {
  const {
    avatar, userName, subtitle, review,
  } = slider;
  return (
    <div className="testimonial-item text-center mx-auto">
      <div className="thumb mb-3 mx-auto">
        <img src={avatar} alt="customer-name" />
      </div>
      <h4 className="mt-3 mb-0">{userName}</h4>
      <span className="subtitle">{subtitle}</span>
      <div className="bg-white padding-30 shadow-dark rounded triangle-top position-relative mt-4">
        <span className="mb-0" dangerouslySetInnerHTML={{ __html: review }} />
      </div>
    </div>
  );
}

Testimonial.propTypes = {
  slider: PropTypes.shape({
    avatar: PropTypes.string,
    userName: PropTypes.string,
    subtitle: PropTypes.string,
    review: PropTypes.string,
  }).isRequired,
};

export default Testimonial;
