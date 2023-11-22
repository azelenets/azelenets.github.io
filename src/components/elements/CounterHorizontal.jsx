import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';

function CounterHorizontal({ counterItem, isVisible }) {
  const { title, count, icon } = counterItem;
  const winWidth = window.innerWidth;
  const countQuery = () => {
    if (winWidth && winWidth > 767) {
      return <CountUp end={isVisible ? count : 0} />;
    }
    return <CountUp end={count} />;
  };

  return (
    <div className="fact-item">
      <span className={`icon ${icon}`} />
      <div className="details">
        <h3 className="mb-0 mt-0 number">
          <em className="count">{countQuery()}</em>
        </h3>
        <p className="mb-0">{title}</p>
      </div>
    </div>
  );
}

CounterHorizontal.defaultProps = {
  isVisible: false,
};

CounterHorizontal.propTypes = {
  counterItem: PropTypes.shape({
    title: PropTypes.string,
    count: PropTypes.number,
    icon: PropTypes.string,
  }).isRequired,
  isVisible: PropTypes.bool,
};

export default CounterHorizontal;
