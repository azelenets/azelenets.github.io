import React from 'react';
import PropTypes from 'prop-types';

function Pricebox({ priceboxItem }) {
  const {
    icon, title, content, price, badge, best,
  } = priceboxItem;
  return (
    <div
      className={
        best
          ? 'price-item bg-white rounded shadow-dark text-center best'
          : 'price-item bg-white rounded shadow-dark text-center'
      }
    >
      {badge && <span className="badge">{badge}</span>}
      <img src={icon} alt="Regular" />
      <h2 className="plan">{title}</h2>
      {content.map((singleContent) => (
        <p key={singleContent.id}>{singleContent.text}</p>
      ))}
      <h3 className="price">
        <em>$</em>
        {price}
        <span>Month</span>
      </h3>
      <a href="!#" className="btn btn-default">
        Get Started
      </a>
    </div>
  );
}

Pricebox.propTypes = {
  priceboxItem: PropTypes.shape({
    icon: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    price: PropTypes.string,
    badge: PropTypes.string,
    best: PropTypes.bool,
  }).isRequired,
};

export default Pricebox;
