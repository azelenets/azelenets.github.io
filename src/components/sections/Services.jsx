import React from 'react';
import { Link } from 'react-scroll';

import Pagetitle from 'components/elements/Pagetitle';
import Service from 'components/elements/Service';

import { COLOR_WHITE } from 'constants';

import BackEndServiceImage from 'images/services/backend.svg';
import FrontEndServiceImage from 'images/services/responsive-web-design-logo.png';
import InfrastructureDevelopmentServiceImage from 'images/services/server.svg';
import DatabaseDevelopmentServiceImage from 'images/services/database.svg';
import TestingServiceImage from 'images/services/testing.svg';
import CodeAuditServiceImage from 'images/services/code-audit.svg';
import OptimizationServiceImage from 'images/services/optimization.svg';

const servicesData = [
  {
    id: 1,
    icon: FrontEndServiceImage,
    title: 'Responsive Front-end Development',
    content:
      'Building web solutions that adapt to every device type. Integrating third-party APIs to add functionalities such as payment gateways, social media sharing, analytics, and more.',
    color: COLOR_WHITE,
    contentColor: 'dark',
  },
  {
    id: 2,
    icon: BackEndServiceImage,
    title: 'Backend Development',
    content:
      'Lorem ipsum dolor sit amet consectetuer adipiscing elit aenean commodo ligula eget.',
    color: COLOR_WHITE,
    contentColor: 'dark',
  },
  {
    id: 3,
    icon: DatabaseDevelopmentServiceImage,
    title: 'Database development',
    content:
      'Lorem ipsum dolor sit amet consectetuer adipiscing elit aenean commodo ligula eget.',
    color: COLOR_WHITE,
    contentColor: 'dark',
  },
  {
    id: 4,
    icon: InfrastructureDevelopmentServiceImage,
    title: 'Infrastructure development',
    content:
      'Lorem ipsum dolor sit amet consectetuer adipiscing elit aenean commodo ligula eget.',
    color: COLOR_WHITE,
    contentColor: 'dark',
  },
  {
    id: 5,
    icon: TestingServiceImage,
    title: 'Automated testing',
    content:
      'Lorem ipsum dolor sit amet consectetuer adipiscing elit aenean commodo ligula eget.',
    color: COLOR_WHITE,
    contentColor: 'dark',
  },
  {
    id: 6,
    icon: CodeAuditServiceImage,
    title: 'MVP Development',
    content:
      'Assisting in building a Minimum Viable Product to test market viability.',
    color: COLOR_WHITE,
    contentColor: 'dark',
  },
  {
    id: 7,
    icon: OptimizationServiceImage,
    title: 'Optimization for Scale',
    content:
      'Enhancing the product’s capabilities to manage increased demand and usage.',
    color: COLOR_WHITE,
    contentColor: 'dark',
  },
];

function Services() {
  return (
    <section id="services">
      <div className="container">
        <Pagetitle title="Services" />
        <div className="row fix-spacing">
          {servicesData.map((service) => (
            <div className="col-md-4" key={service.id}>
              <Service service={service} />
            </div>
          ))}
        </div>
        <div className="mt-5 text-center">
          <p className="mb-0">
            Looking for a custom job?
            {' '}
            <Link
              className="colorpink pointer"
              to="section-contact"
              spy
              smooth
              duration={500}
            >
              Click here
            </Link>
            {' '}
            to contact me! 👋
          </p>
        </div>
      </div>
    </section>
  );
}

export default Services;
