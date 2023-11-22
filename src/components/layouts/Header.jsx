import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-scroll';

function Header({
  light, toggleMenu, headerToggler,
}) {
  const handleClasses = () => {
    let classes = 'desktop-header-2 d-flex align-items-start flex-column';
    // eslint-disable-next-line no-bitwise
    if (light & toggleMenu) {
      classes += ' light open';
    } else if (toggleMenu) {
      classes += ' open';
    } else if (light) {
      classes += ' light';
    }
    return classes;
  };
  const handleMobileClasses = () => {
    let classes = 'mobile-header-2';
    // eslint-disable-next-line no-bitwise
    if (light & toggleMenu) {
      classes += ' light open';
    } else if (toggleMenu) {
      classes += ' open';
    } else if (light) {
      classes += ' light';
    }
    return classes;
  };
  return (
    <>
      <header className={handleMobileClasses()}>
        <div className="container">
          <div className="menu-icon d-inline-flex mr-4">
            <button onClick={headerToggler} aria-label="Open main menu" type="button">
              <span />
            </button>
          </div>
        </div>
      </header>
      <header className={handleClasses()}>
        <nav>
          <ul className="vertical-menu scrollspy">
            <li>
              <Link
                activeClass="active"
                to="section-home"
                spy
                smooth
                duration={500}
              >
                <i className="icon-home" />
              </Link>
            </li>
            <li>
              <Link
                activeClass="active"
                to="section-about"
                spy
                smooth
                duration={500}
              >
                <i className="icon-user-following" />
              </Link>
            </li>
            <li>
              <Link
                activeClass="active"
                to="section-services"
                spy
                smooth
                duration={500}
              >
                <i className="icon-briefcase" />
              </Link>
            </li>
            <li>
              <Link
                activeClass="active"
                to="section-education"
                spy
                smooth
                duration={500}
              >
                <i className="icon-graduation" />
              </Link>
            </li>
            <li>
              <Link
                activeClass="active"
                to="section-experiences"
                spy
                smooth
                duration={500}
              >
                <i className="icon-graduation" />
              </Link>
            </li>
            <li>
              <Link
                activeClass="active"
                to="section-works"
                spy
                smooth
                duration={500}
              >
                <i className="icon-layers" />
              </Link>
            </li>
            <li>
              <Link
                activeClass="active"
                to="section-contact"
                spy
                smooth
                duration={500}
              >
                <i className="icon-note" />
              </Link>
            </li>
          </ul>
        </nav>

        {/* <div className="footer"> */}
        {/*  <span className="copyright"> */}
        {/*    &copy; */}
        {/*    {' '} */}
        {/*    {new Date().getFullYear()} */}
        {/*    {' '} */}
        {/*    Andrew Zelenets. */}
        {/*  </span> */}
        {/* </div> */}
      </header>
    </>
  );
}

Header.defaultProps = {
  light: false,
};

Header.propTypes = {
  light: PropTypes.bool,
  toggleMenu: PropTypes.bool.isRequired,
  headerToggler: PropTypes.func.isRequired,
};

export default Header;
