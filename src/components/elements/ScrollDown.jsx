import React from 'react';
import { Link } from 'react-scroll';

function ScrollDown() {
  return (
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
  );
}

export default ScrollDown;
