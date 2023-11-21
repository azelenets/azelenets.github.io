import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';

function Counter({ counterItem, isVisible }) {
  const { title, count, icon } = counterItem;
  const winWidth = window.innerWidth;
  const countQuery = () => {
    if (winWidth && winWidth > 767) {
      return <CountUp end={isVisible ? count : 0} />;
    }
    return <CountUp end={count} />;
  };
  const handleIcon = () => `icon ${icon}`;
  return (
    <div className="fact-item">
      <span className={handleIcon()} />
      <div className="details">
        <h3 className="mb-0 mt-0 number">
          <em className="count">{countQuery()}</em>
        </h3>
        <p className="mb-0">{title}</p>
      </div>
    </div>
  );
}

Counter.defaultProps = {
  isVisible: false,
};

Counter.propTypes = {
  counterItem: PropTypes.shape({
    title: PropTypes.string,
    count: PropTypes.number,
    icon: PropTypes.string,
  }).isRequired,
  isVisible: PropTypes.bool,
};

export default Counter;
