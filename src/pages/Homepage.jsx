import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import ReactCursorPosition from 'react-cursor-position';
import { Element } from 'react-scroll';
import classnames from 'classnames';

import Header from 'components/layouts/Header';
import About from 'components/sections/About';
import Contact from 'components/sections/Contact';
import Experiences from 'components/sections/Experiences';
import Herosection from 'components/sections/Herosection';
import Services from 'components/sections/Services';
import Testimonials from 'components/sections/Testimonials';
import Works from 'components/sections/Works';
import Education from 'components/sections/Education';
// import Brandlogos from '../components/sections/Brandlogos';

function Homepage() {
  useEffect(() => {
    document.body.classList.remove('dark');
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerToggler = (e) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  document.addEventListener('click', (e) => {
    if (e.target.closest('.content-2')) {
      setIsMenuOpen(false);
    }
  });

  return (
    <>
      <Header light isMenuOpen={isMenuOpen} headerToggler={headerToggler} />

      <main className={classnames('content-2', { open: isMenuOpen })}>
        <Element name="section-home">
          <ReactCursorPosition>
            <Herosection light />
          </ReactCursorPosition>
        </Element>
        {/* <Element name="section-brandlogos"> */}
        {/* <Brandlogos /> */}
        {/* </Element> */}
        <Element name="section-about">
          <About />
        </Element>
        <Element name="section-services">
          <Services />
        </Element>
        <Element name="section-experiences">
          <Experiences />
        </Element>
        <Element name="section-education">
          <Education />
        </Element>
        <Element name="section-works">
          <Works />
        </Element>
        <Element name="section-testimoninal">
          <Testimonials />
        </Element>
        <Element name="section-contact">
          <Contact />
        </Element>
        <div className="spacer" data-height="96" />
        <Tooltip id="application-tooltip" variant="dark" clickable />
      </main>
    </>
  );
}

export default Homepage;
