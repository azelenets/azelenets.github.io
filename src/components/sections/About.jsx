import React from 'react';
import TrackVisibility from 'react-on-screen';
import moment from 'moment';

import counterData from 'json/about/counters';
import skills from 'json/about/skills.json';

import CounterHorizontal from 'components/elements/CounterHorizontal';
import Pagetitle from 'components/elements/Pagetitle';
import Skill from 'components/elements/Skill';

function About() {
  return (
    <section id="about">
      <div className="container">
        <Pagetitle title="About Me" />

        <div className="row">
          <div className="col-md-12 triangle-left-md triangle-top-sm">
            <div className="rounded bg-white shadow-dark padding-3em">
              <div className="row">
                <div className="col-md-12">
                  <div>
                    <p>
                      Passionate about fast, secure, scalable, highly performant, elegant
                      software engineering solution with a high-quality user-friendly
                      experiences.
                    </p>

                    <p>
                      As owner of over the
                      {' '}
                      {moment().diff([2012, 6, 1], 'years')}
                      {' '}
                      years of software development experience and Master&apos;s
                      degree in the &#34;Computer systems control and automation&#34;
                      I consider myself as highly skilled Software Engineer with the strong
                      technical background, problem-solving skills, ability to work autonomously
                      and clear communication skills.

                    </p>

                    <p>
                      I managed to make customers happy from a wide range of industries including
                      management, safety, e-commerce, logistic & transportation, education,
                      tourism, entertainment, management, advertising, booking, social, and
                      multimedia.
                    </p>

                    <ul className="skills-list">
                      {skills.map(({ title, description }) => (
                        <Skill key={title} title={title} description={description} />
                      ))}
                    </ul>

                    <p>
                      Ultimately, I am uncovering in practice the idea that software has
                      the potential to shape a better world, and as a Software Engineer,
                      I am committed to contributing to that positive evolution.
                    </p>

                    <p className="text-right">
                      Interested?
                      {' '}
                      <a href="https://calendly.com/andrew-zelenets/30min" rel="noreferrer" target="_blank">
                        Let me tackle your challenges
                      </a>
                      {' '}
                      and pave the way for the success of innovation!
                    </p>
                  </div>

                  <div className="mt-3">
                    <a href="!#" className="btn btn-default btn-lg download-cv">
                      Download CV
                    </a>
                  </div>
                  <div
                    className="spacer d-md-none d-lg-none"
                    data-height="30"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="spacer" data-height="70" />

        <div className="row fix-spacing">
          {counterData.map((counter) => (
            <div key={counter.id} className="col-md-3 col-sm-6">
              <TrackVisibility once>
                <CounterHorizontal counterItem={counter} />
              </TrackVisibility>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
