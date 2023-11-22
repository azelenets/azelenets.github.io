import React from 'react';
import TrackVisibility from 'react-on-screen';
import moment from 'moment';
import Counter from '../elements/Counter';
import Pagetitle from '../elements/Pagetitle';
// import Skill from '../elements/Skill';
import avatarImage from '../../images/avatar-without-bg.png';

import counterData from '../../json/about/counters';

const aboutContent = {
  avatarImage,
  name: 'Andrew Zelenets',
  content:
  <div>
    <p>
      Highly skilled Software Engineer with the strong problem-solving skills, ability to work
      autonomously and clear communication skills. Owner of over
      {' '}
      {moment().diff([2012, 6, 1], 'years')}
      {' '}
      years of experience in commercial software development and solid background in computer
      science.
    </p>

    <ul>
      <li>
        <h4 className="mb-1">Customer Orientation</h4>
        <p className="mb-1">
          I firmly believe in the transformative power of technology to elevate human experiences.
          With a comprehensive understanding of business best practices and customer needs,
          I am dedicated to finding innovative technical solutions that will drive success.
          Crafting solutions that are not only functionally robust but also user-centric,
          realizing that technology should enhance and simplify the lives of those who interact
          with it.
        </p>
      </li>
      <li>
        <h4 className="mb-1">Engineering Excellence</h4>
        <p className="mb-1">
          Demonstrated strong expertise in developing end-to-end solutions, managing complexities
          within vast ecosystems, and leading engineering research initiatives.
          Experienced problem solver...
        </p>
      </li>
      <li>
        <h4 className="mb-1">Team Collaboration</h4>
        <p className="mb-1">
          Collaboration and effective constructive communication are the key tenets
          of my relationships.
          I am a dedicated team player with exceptional communication and interpersonal skills.
          I believe in the effectiveness of working closely with diverse teams and
          valuing each member&apos;s unique perspective to create solutions that are
          greater than the sum of their parts.
        </p>
      </li>
      <li>
        <h4 className="mb-1">Strategic Leadership</h4>
        <p className="mb-1">
          Extensive background in building robust tech foundations, leading engineering efforts,
          and navigating the challenges of large-scale ecosystems.
          Proficient in creating tech designs, overseeing the implementation of proof of concepts,
          and ensuring alignment with stakeholders to drive successful project outcomes.
        </p>
      </li>
      <li>
        <h4 className="mb-1">Management</h4>
        <p className="mb-1">
          Strong project execution skills across various IT functions
        </p>
      </li>
    </ul>

    <p>
      Ultimately, I am uncovering in practice the idea that software has the potential to shape
      a better world, and as a Software Engineer, I am committed to contributing to that
      positive evolution.
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
  </div>,
};

// const mainSkillsData = [
//   {
//     id: 1,
//     title: 'Customer Orientation',
//     percentage: 100,
//     progressColor: '#6C6CE5',
//     description:
//   <p>
//     With a comprehensive understanding of business best practices and customer needs,
//     I am dedicated to finding innovative technical solutions that will drive success.
//     I firmly believe in the transformative power of technology to elevate human experiences.
//     Crafting solutions that are not only functionally robust but also user-centric,
//     realizing that technology should enhance and simplify the lives of those who interact
//     with it.
//     {' '}
//     <a href="https://calendly.com/andrew-zelenets/30min" rel="noreferrer" target="_blank">
//       Let&apos;s tackle your challenges
//     </a>
//     {' '}
//     together and pave the way for the success of innovation!
//   </p>,
//   },
//   {
//     id: 2,
//     title: 'Engineering Excellence',
// DevOps and CI/CD, API development, Databases and ORM, Web Security
//     percentage: 80,
//     progressColor: '#6C6CE5',
//   },
//   {
//     id: 3,
//     title: 'Team Collaboration',
// Active listening, Attention to detail, Presentation, Leadership, Mentoring
//     percentage: 94,
//     progressColor: '#FF4C60',
//   },
//   {
//     id: 4,
//     title: 'Strategic Leadership',
// Software Architecture,  Front-end development, Back-end development, Testing and Debugging,
//     percentage: 80,
//     progressColor: '#6C6CE5',
//   },
//   {
//     id: 5,
//     title: 'Management', // Time, Risk management, Delegation, Deadline, Multi-tasking
//     percentage: 95,
//     progressColor: '#FFD15C',
//   },
// ];

function About() {
  return (
    <section id="about">
      <div className="container">
        <Pagetitle title="About Me" />

        <div className="row">
          <div className="col-md-12 triangle-left-md triangle-top-sm">
            <div className="rounded bg-white shadow-dark padding-30">
              <div className="row">
                <div className="col-md-12">
                  {aboutContent.content}

                  <div className="mt-3">
                    <a href="!#" className="btn btn-default btn-lg">
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
                <Counter counterItem={counter} />
              </TrackVisibility>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
