import React from 'react';
import PropTypes from 'prop-types';

function Skill({ progress, isVisible }) {
  const { title, percentage, progressColor } = progress;
  const winWidth = window.innerWidth;
  const progressQuery = () => {
    if (winWidth && winWidth > 767) {
      return (
        <div
          className="progress-bar data-background"
          style={
            isVisible
              ? {
                width: `${percentage}%`,
                background: progressColor,
              }
              : { width: 0, background: progressColor }
          }
        />
      );
    }
    return (
      <div
        className="progress-bar data-background"
        style={{
          width: `${percentage}%`,
          background: progressColor,
        }}
      />
    );
  };
  return (
    <div className="skill-item">
      <div className="skill-info clearfix">
        <h4 className="float-left mb-3 mt-0">{title}</h4>
        <span className="float-right">
          {percentage}
          %
        </span>
      </div>
      <div className="progress">{progressQuery()}</div>
    </div>
  );
}

Skill.defaultProps = {
  isVisible: false,
};

Skill.propTypes = {
  progress: PropTypes.shape({
    title: PropTypes.string,
    percentage: PropTypes.number,
    progressColor: PropTypes.string,
  }).isRequired,
  isVisible: PropTypes.bool,
};

export default Skill;
