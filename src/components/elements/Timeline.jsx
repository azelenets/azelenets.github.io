import React from 'react';
import PropTypes from 'prop-types';
import ScrollAnimation from 'react-animate-on-scroll';

import { technologyToDescriptionMapping, technologyToIconMapping } from 'components/elements/Timeline.utils';

function Timeline({ experience }) {
  const {
    id, years, title, content, responsibilities = [], achievements = [], technologies = [],
  } = experience;

  return (
    <ScrollAnimation
      animateIn="fadeInUp"
      animateOut="fadeInOut"
      animateOnce
    >
      <div id={`timeline-${id}`} className="timeline-container">
        <div className="content">
          <span className="time">{years}</span>
          <h3 className="title">{title}</h3>
          {content}

          {(responsibilities.length > 0 || achievements.length > 0 || technologies.length > 0) && (
            <div className="row gap-3 p-3">
              <ul className="nav nav-pills" id={`timeline-nav-${id}`} role="tablist">
                {achievements.length > 0 && (
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link btn btn-outline-secondary btn-sm active"
                      id={`achievements-tab-${id}`}
                      data-bs-toggle="tab"
                      data-bs-target={`#achievements-content-${id}`}
                      type="button"
                      role="tab"
                      aria-controls={`achievements-content-${id}`}
                      aria-selected="true"
                    >
                      Achievements
                    </button>
                  </li>
                )}
                {responsibilities.length > 0 && (
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link btn btn-outline-secondary btn-sm"
                      id={`responsibilities-tab-${id}`}
                      data-bs-toggle="tab"
                      data-bs-target={`#responsibilities-content-${id}`}
                      type="button"
                      role="tab"
                      aria-controls={`responsibilities-content-${id}`}
                      aria-selected="false"
                    >
                      Duties
                    </button>
                  </li>
                )}
                {technologies.length > 0 && (
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link btn btn-outline-secondary btn-sm"
                      id={`technologies-tab-${id}`}
                      data-bs-toggle="tab"
                      data-bs-target={`#technologies-content-${id}`}
                      type="button"
                      role="tab"
                      aria-controls={`technologies-content-${id}`}
                      aria-selected="false"
                    >
                      Technologies
                    </button>
                  </li>
                )}
              </ul>

              <div className="tab-content p-0">
                {achievements.length > 0 && (
                  <div className="tab-pane active" id={`achievements-content-${id}`} role="tabpanel" aria-labelledby={`achievements-tab-${id}`}>
                    <ul>
                      {achievements.map((achievement) => (
                        // eslint-disable-next-line react/no-danger
                        <li key={`experience-${id}-achievement-${achievement}`} dangerouslySetInnerHTML={{ __html: achievement }} />
                      ))}
                    </ul>
                  </div>
                )}

                {responsibilities.length > 0 && (
                  <div className="tab-pane" id={`responsibilities-content-${id}`} role="tabpanel" aria-labelledby={`responsibilities-tab-${id}`}>
                    <ul>
                      {responsibilities.map((responsibility) => (
                        // eslint-disable-next-line react/no-danger
                        <li key={`experience-${id}-responsibility-${responsibility}`} dangerouslySetInnerHTML={{ __html: responsibility }} />
                      ))}
                    </ul>
                  </div>
                )}

                {technologies.length > 0 && (
                  <div className="tab-pane" id={`technologies-content-${id}`} role="tabpanel" aria-labelledby={`technologies-tab-${id}`}>
                    <div className="row">
                      {technologies.map((technology) => (
                        <div className="col-md-1 col-3 technology-item" key={`experience-${id}-technology-${technology}`}>
                          <figure className="figure">
                            <img src={technologyToIconMapping[technology]} alt={technology} className="figure-img img-fluid" />
                            <figcaption className="figure-caption">{technologyToDescriptionMapping[technology]}</figcaption>
                          </figure>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </ScrollAnimation>
  );
}

Timeline.propTypes = {
  experience: PropTypes.shape({
    id: PropTypes.string,
    years: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    content: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.string]),
    responsibilities: PropTypes.arrayOf(PropTypes.string),
    achievements: PropTypes.arrayOf(PropTypes.string),
    technologies: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Timeline;
