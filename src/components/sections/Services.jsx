import React from 'react';
import { Link } from 'react-scroll';

import Pagetitle from 'components/elements/Pagetitle';
import Service from 'components/elements/Service';

import BackEndServiceImage from 'images/services/backend.svg';
import FrontEndServiceImage from 'images/services/frontend.svg';
import InfrastructureDevelopmentServiceImage from 'images/services/server.svg';
import DatabaseDevelopmentServiceImage from 'images/services/database.svg';
import TestingServiceImage from 'images/services/testing.svg';
import CodeAuditServiceImage from 'images/services/code-audit.svg';
import OptimizationServiceImage from 'images/services/optimization.svg';

const servicesData = [
  {
    id: 1,
    icon: FrontEndServiceImage,
    title: 'Frontend development',
    content:
      'Lorem ipsum dolor sit amet consectetuer adipiscing elit aenean commodo ligula eget.',
    color: '#6C6CE5',
    contentColor: 'light',
  },
  {
    id: 2,
    icon: BackEndServiceImage,
    title: 'Backend Development',
    content:
      'Lorem ipsum dolor sit amet consectetuer adipiscing elit aenean commodo ligula eget.',
    color: '#F9D74C',
    contentColor: 'dark',
  },
  {
    id: 3,
    icon: DatabaseDevelopmentServiceImage,
    title: 'Database development',
    content:
      'Lorem ipsum dolor sit amet consectetuer adipiscing elit aenean commodo ligula eget.',
    color: '#F97B8B',
    contentColor: 'light',
  },
  {
    id: 4,
    icon: InfrastructureDevelopmentServiceImage,
    title: 'Infrastructure development',
    content:
      'Lorem ipsum dolor sit amet consectetuer adipiscing elit aenean commodo ligula eget.',
    color: '#F97B8B',
    contentColor: 'light',
  },
  {
    id: 5,
    icon: TestingServiceImage,
    title: 'Automated testing',
    content:
      'Lorem ipsum dolor sit amet consectetuer adipiscing elit aenean commodo ligula eget.',
    color: '#6C6CE5',
    contentColor: 'light',
  },
  {
    id: 6,
    icon: CodeAuditServiceImage,
    title: 'Code audit',
    content:
      'Lorem ipsum dolor sit amet consectetuer adipiscing elit aenean commodo ligula eget.',
    color: '#F9D74C',
    contentColor: 'dark',
  },
  {
    id: 7,
    icon: OptimizationServiceImage,
    title: 'Performance optimization',
    content:
      'Lorem ipsum dolor sit amet consectetuer adipiscing elit aenean commodo ligula eget.',
    color: '#F9D74C',
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
