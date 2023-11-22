import React from 'react';
import PropTypes from 'prop-types';
import Typed from 'react-typed';
import { Link } from 'react-scroll';
import avatarImage from '../../images/avatar-without-bg.png';
import { ReactComponent as DataDogIcon } from '../../images/technologies/datadog.svg';
import { ReactComponent as RubyIcon } from '../../images/technologies/ruby.svg';
import { ReactComponent as ReactJsIcon } from '../../images/technologies/react.svg';
import { ReactComponent as RubyOnRailsIcon } from '../../images/technologies/rubyonrails.svg';
import { ReactComponent as PostgresqlIcon } from '../../images/technologies/postgresql.svg';
import { ReactComponent as JavaScriptIcon } from '../../images/technologies/javascript.svg';
import { ReactComponent as WebpackIcon } from '../../images/technologies/webpack.svg';
import { ReactComponent as DockerIcon } from '../../images/technologies/docker.svg';
import { ReactComponent as FfmpegIcon } from '../../images/technologies/ffmpeg.svg';
import { ReactComponent as Html5Icon } from '../../images/technologies/html5.svg';
import { ReactComponent as NextJsIcon } from '../../images/technologies/nextdotjs.svg';
import { ReactComponent as TypeScriptIcon } from '../../images/technologies/typescript.svg';
import { ReactComponent as BootstrapIcon } from '../../images/technologies/bootstrap.svg';
import { ReactComponent as ContentfulIcon } from '../../images/technologies/contentful.svg';
import { ReactComponent as DotEnvIcon } from '../../images/technologies/dotenv.svg';
import { ReactComponent as GoogleMapsIcon } from '../../images/technologies/googlemaps.svg';
import { ReactComponent as GooglePayIcon } from '../../images/technologies/googlepay.svg';
import { ReactComponent as ApplePayIcon } from '../../images/technologies/applepay.svg';

function Herosection({ position, elementDimensions, light }) {
  const { x, y } = position;
  const { height, width } = elementDimensions;

  const activeParallax = (depth = 15) => {
    const posX = (width / 2 - x) / depth;
    const posY = (height / 2 - y) / depth;
    return {
      transform: `translate(${posX}px, ${posY}px)`,
    };
  };

  return (
    <section
      id="home"
      className={`home d-flex align-items-center ${light ? 'light' : ''}`}
    >
      <div className="container">
        <div className="intro">
          <img src={avatarImage} alt="Andrew Zelenets" className="mb-4 avatar-main" />

          <h1 className="mb-2 mt-0">Andrew Zelenets</h1>
          <p className="dynamic-text">
            I&#39;m a
            {' '}
            <Typed
              strings={[
                'Technical Consultant',
                'Senior Full-stack web engineer',
                'Senior Front-End developer',
                'Senior Back-End developer',
              ]}
              typeSpeed={80}
              backSpeed={40}
              attr="value"
              loop
            >
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label value />
            </Typed>
          </p>

          <ul className="social-icons light list-inline mb-0 mt-4">
            <li className="list-inline-item">
              <a target="_blank" rel="noreferrer" href="https://github.com/azelenets" aria-label="GitHub profile">
                <i className="fab fa-github" aria-hidden="true" />
              </a>
            </li>
            <li className="list-inline-item">
              <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/andrewzelenets" aria-label="LinkedIn profile">
                <i className="fab fa-linkedin" aria-hidden="true" />
              </a>
            </li>
            <li className="list-inline-item">
              <a target="_blank" rel="noreferrer" href="https://wellfound.com/u/andrew-zelenets" aria-label="AngelList profile">
                <i className="fab fa-angellist" aria-hidden="true" />
              </a>
            </li>
            <li className="list-inline-item">
              <a target="_blank" rel="noreferrer" href="https://gist.github.com/azelenets" aria-label="Gist profile">
                <i className="fa fa-code" aria-hidden="true" />
              </a>
            </li>
            <li className="list-inline-item">
              <a target="_blank" rel="noreferrer" href="https://stackoverflow.com/users/4193311/andrew-zelenets" aria-label="StackOverflow profile">
                <i className="fab fa-stack-overflow" aria-hidden="true" />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="mailto:andrew.zelenets+github@gmail.com" aria-label="Email me">
                <i className="fa fa-envelope" />
              </a>
            </li>
          </ul>

          <div className="mt-4">
            <Link
              className="btn btn-default btn-lg"
              to="section-contact"
              spy
              smooth
              duration={500}
            >
              Hire me!
            </Link>
          </div>
        </div>

        <div className="scroll-down">
          <Link
            to="section-about"
            spy
            smooth
            duration={500}
            className="mouse-wrapper"
          >
            <span>Scroll Down</span>
            <span className="mouse">
              <span className="wheel" />
            </span>
          </Link>
        </div>

        <div className="parallax" data-relative-input="true">
          <RubyIcon width="50" className="layer p1" style={activeParallax(15)} />
          <ReactJsIcon width="50" className="layer p2" style={activeParallax(20)} />
          <RubyOnRailsIcon width="50" className="layer p3" style={activeParallax(25)} />
          <PostgresqlIcon width="50" className="layer p4" style={activeParallax(10)} />
          <JavaScriptIcon width="50" className="layer p5" style={activeParallax(8)} />
          <WebpackIcon width="50" className="layer p6" style={activeParallax(18)} />
          <DockerIcon width="50" className="layer p7" style={activeParallax(22)} />
          <FfmpegIcon width="50" className="layer p8" style={activeParallax(15)} />
          <Html5Icon width="50" className="layer p9" style={activeParallax(10)} />
          <NextJsIcon width="50" className="layer p10" style={activeParallax(23)} />
          <TypeScriptIcon width="50" className="layer p11" style={activeParallax(18)} />
          <BootstrapIcon width="50" className="layer p12" style={activeParallax(13)} />
          <DataDogIcon width="50" className="layer p13" style={activeParallax(10)} />
          <ContentfulIcon width="50" className="layer p14" style={activeParallax(33)} />
          <DotEnvIcon width="50" className="layer p15" style={activeParallax(12)} />
          <GoogleMapsIcon width="50" className="layer p16" style={activeParallax(18)} />
          <GooglePayIcon width="50" className="layer p17" style={activeParallax(14)} />
          <ApplePayIcon width="50" className="layer p18" style={activeParallax(10)} />
        </div>
      </div>
    </section>
  );
}

Herosection.defaultProps = {
  position: {},
  elementDimensions: {},
  light: false,
};

Herosection.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  elementDimensions: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  light: PropTypes.bool,
};

export default Herosection;
