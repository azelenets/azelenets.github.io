import React from 'react';
import Pagetitle from '../elements/Pagetitle';
import Timeline from '../elements/Timeline';

const experienceData = [
  {
    id: 1,
    title:
  <>
    Senior Full Stack Web Engineer @
    <a href="https://seekingalpha.com">SeekingAlpha</a>
  </>,
    years: '09/2021 - Present',
    content:
  <p>
    Worked in a fully remote distributed team (40+ developers) to develop and maintain large-scale
    e-commerce web system for publishers using Ruby on Rails and ReactJS.
  </p>,
    responsibilities: [
      'Help architect core parts of our infrastructure from the ground up in a reliable way',
      'Participate in design and planning discussions, and contribute architectural ideas',
      'Develop API for modern cross-platform responsible SPA from the ground up',
      'Overseeing the work of developers, reviewing pull requests',
      'Write highly scalable, reusable, and testable code',
      'Optimize application for maximum speed and performance',
      'Sailthru (Marigold Engage) integration',
      'PayPal/Stripe payment system integration',
      'Improve SEO',
    ],
    achievements: [
      'Reduced the development time, and increased stability and scalability of the platform by integration of the modular application architecture',
      'Improved API performance by 8% by optimizing database queries, reducing page load times, and implementing caching strategies',
      'Analyzed and improved application efficiency by 8% optimizing database queries, implementing caching strategies and code refactoring',
      'Resolved critical issues. I have successfully resolved critical issues that impacted the functionality and user experience of the platform. This involved identifying the root cause of the issue, implementing a fix, and testing the solution to ensure that it resolved the problem',
      'Implemented OTP user login',
    ],
    technologies: [
      'slack',
      'ruby',
      'ruby_on_rails',
      'rspec',
      'javascript',
      'reactjs',
      'redux',
      'postgresql',
      'html5',
      'rubocop',
      'sass',
      'sphinx',
      'kibana',
      'sailthru',
      'redis',
      'amazons3',
      'x',
      'stripe',
      'dotenv',
      'elasticsearch',
      'googletagmanager',
      'google',
      'jwt',
      'moustache',
      'jira',
      'brakeman',
      'github',
      'jenkins',
      'amazon_ec2',
      'logz_io',
      'confluence',
      'opsgenie',
      'figma',
      'sentry',
      'git',
      'jquery',
    ],
  },
  {
    id: 2,
    title:
  <>
    <span>Technical Consultant / Senior Full Stack Web Engineer @</span>
    <a href="https://theskills.com">The Skills</a>
  </>,
    years: '11/2020 - 12/2021',
    content:
  <p>
    Acted as the Technical Consultant in a fully remote distributed team at the
    startup company for the video-based educational platform.
    The solution includes an administrator panel, customer web application, and
    REST API based on the Ruby On Rails / NextJs framework.
    Worked as a fullstack developer as part of a 4 people team on the solution
    for the marketing website using the NextJs framework.
  </p>,
    responsibilities: [
      'Collaborate with the product and marketing managers to find suitable solutions',
      'Ensure the features met the requirements and expectations of stakeholders',
      'Oversee the work of developers, conduct code reviews, and help colleagues troubleshoot their code',
      'Identify, conceptualize, and launch new initiatives',
      '3rd party services integration',
      'Payment processor integration',
      'Build user authentication and authorization solution',
      'Data storage modeling and architecture',
      'Design RESTful API’s endpoints',
      'Code Review, product data repair, bug monitoring and quick response to customer service feedback',
    ],
    achievements: [
      'Client raised $4,9M',
      'Developed from scratch a web platform for education platform as a lead developer in a team of 4',
      'Participated in every step of the product development process - from the idea through development and improvement',
      'Built user authentication and authorization solution based on JWT tokens integrated login with Google, Facebook, Apple',
      'Designed the system in a modular way (admin, marketing site, customer application, API) resulting in reducing maintenance time and costs by 27%',
      "Developed and integrated RESTful API's for Web and Mobile applications",
      'Designed and implemented database architecture for applications using Postgres',
      'Successfully integrated  Apple/Android In-App purchases, which increased customer funnel up to 7%',
      'Built video content delivery solution based on the Brightcove platform',
      'Integrated Stripe for credit card payments and PayPal payment processors. In addition integrated Apple/Android In-App purchases for the mobile application',
      'Implemented from scratch JSON REST API using the latest best practices',
      'Covered with the API documentation 100% of the API endpoints using Swagger',
      'Achieved 83 % of code test coverage',
      'Took part in the process of A/B testing experiments. That included helping in designing a feature, releasing it, getting statistics on its usage and then tweaking it or rolling back',
      'Implemented scalable high-performed data storage system using Postgres + Redis',
    ],
    technologies: [
      'slack',
      'ruby',
      'ruby_on_rails',
      'rspec',
      'javascript',
      'typescript',
      'reactjs',
      'redux',
      'html5',
      'sass',
      'postgresql',
      'amazons3',
      'nextdotjs',
      'nodedotjs',
      'dotenv',
      'rubocop',
      'googletagmanager',
      'google',
      'jwt',
      'jest',
      'awslambda',
      'ffmpeg',
      'stripe',
      'paypal',
      'brightcove',
      'swagger',
      'googlepay',
      'applepay',
      'applelogin',
      'rpush',
      'storybook',
      'clickup',
      'heroku',
      'vercel',
      'axios',
      'brakeman',
      'github_actions',
      'github',
      'docker',
      'drawio',
      'contentful',
      'postman',
      'facebook',
      'figma',
      'prisma',
      'sentry',
      'selenium',
      'x',
      'git',
      'gnubash',
      'jquery',
      'sequelize',
      'amazonsqs',
    ],
  },
  {
    id: 3,
    title:
  <>
    Senior Full-Stack developer / Technical lead @
    <a href="https://sloboda-studio.com">Sloboda Studio</a>
  </>,
    years: '08/2019 - 11/2020',
    content:
  <p>TBD</p>,
    responsibilities: [
      'Manage projects with agile methodologies in JIRA via user stories and customer issues',
      'Coordinate teams of programmers and supervise the development process',
      'Work closely with customers directly on product development and provide product support',
      'Determining the underlying architecture for the software',
      'Overseeing the work of developers, reviewing pull requests',
      'Mentoring new staff, train and supervise developers',
      'Help new employees to become familiar with teamwork, early guidance and team integration',
      'Serving as technical adviser to managers and clients',
      'Requirement gathering and analysis',
      'Drive and lead technical initiatives to keep company up-to-date with best practices',
      'Improve engineering standards, tooling, and processes',
      'Lead daily customer service and technical team docking meetings to set up internal docking process',
    ],
    achievements: [
      'Hired, trained and lead Agile team of 5 full-stack developers',
      'Integrated CD flow using GitlabCI pipelines, reducing the code delivery time to 33%',
      'Designed and developed applications for over 4 clients using Ruby On Rails, React, AWS',
      'Oversaw and completed various major new client on-boarding procedures',
      'Shortened new project/feature estimation timelines by using a brand new estimation template, which improved the efficiency of operating by 30%',
      'Designed and implemented Company new developers hiring/on-boarding process for the use of over 15 employees',
      'Revamped and reorganized the company-wide tech meetings, which got talent growth boost up to 11%',
    ],
    technologies: [
      'postman',
      'slack',
      'ruby',
      'ruby_on_rails',
      'rspec',
      'javascript',
      'reactjs',
      'redux',
      'mobx',
      'html5',
      'sass',
      'postgresql',
      'amazons3',
      'dotenv',
      'rubocop',
      'google',
      'jwt',
      'jest',
      'ffmpeg',
      'stripe',
      'paypal',
      'swagger',
      'googlepay',
      'applepay',
      'applelogin',
      'rpush',
      'storybook',
      'jira',
      'trello',
      'heroku',
      'brakeman',
      'github_actions',
      'gitlab',
      'github',
      'digitalocean',
      'amazon_ec2',
      'jenkins',
      'docker',
      'bitbucket',
      'logz_io',
      'drawio',
      'facebook',
      'chartjs',
      'figma',
      'sentry',
      'selenium',
      'x',
      'git',
      'react_router',
      'gnubash',
      'jquery',
    ],
  },
  {
    id: 4,
    title: 'Senior Full-Stack developer / Technical lead @ Apriorit',
    years: '01/2019 - 08/2019',
    content:
  <p>
    Worked on secure, flexible and adaptable identity and access management platform
    components with full software development cycle - requirements analysis, design,
    implementation, testing, deployment and technical support.
  </p>,
    responsibilities: [
      'Perform the technical lead role overseeing the development of a multi-factor adaptive authentication and access management solution',
      'Keep the team focused on the project and moving toward reaching its goal - engage, motivate and take care of their needs and maintain a friendly and productive work environment',
      'High-level project road-map planning',
      'Providing technical expertise and guidance to team members. Assisting in problem-solving, code reviews, and architectural decisions',
      'Mentor and guide  junior software developers on design patterns and development best practices',
      'Document solutions by developing documentation, flowcharts, layouts, DB diagrams, charts, code comments, and clear testable code',
      'Participate in daily stand-ups, software design sessions, code reviews, and sprint retrospectives',
      'Translate Agile requirements into conceptual and detailed designs',
    ],
    achievements: [
      'Successfully performed code audit to meet the SOC2 application certification. Audit included - Security, Availability, Processing Integrity, Confidentiality, Privacy',
      'Managed team with 6 developers in 3 projects for 1 client',
      'Organized product-specific domain UI design into the Design System using StoryBook',
      'Contributed over 30 new components to the in-house UI Storybook library to create reusable React components',
      'Handled multiple languages/frameworks development',
    ],
    technologies: [
      'slack',
      'ruby',
      'elasticsearch',
      'javascript',
      'redis',
      'axios',
      'redux',
      'mobx',
      'rspec',
      'reactjs',
      'ruby_on_rails',
      'docker',
      'storybook',
      'github',
      'bitbucket',
      'confluence',
      'jira',
      'drawio',
      'jenkins',
      'postman',
      'opsgenie',
      'chartjs',
      'figma',
      'postgresql',
      'amazons3',
      'dotenv',
      'rubocop',
      'jwt',
      'cypress',
      'swagger',
      'checkmarx',
      'brakeman',
      'datadog',
      'git',
      'react_router',
      'amazon_document_db',
      'ruby_sinatra',
      'ruby_grape',
      'gnubash',
      'csharp',
      'dotnet',
      'amazonsqs',
    ],
  },
];

function Experiences() {
  return (
    <section id="experience">
      <div className="container">
        <Pagetitle title="Experience" />
        <div className="row">
          <div className="col-md-12">
            <div className="spacer d-md-none d-lg-none" data-height="30" />
            <div className="timeline exp bg-white rounded shadow-dark padding-30 overflow-hidden">
              {experienceData.map((experience) => (
                <Timeline key={experience.id} experience={experience} />
              ))}
              <span className="line" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experiences;
