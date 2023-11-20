import React from "react";
import Pagetitle from "../elements/Pagetitle";
import Timeline from "../elements/Timeline";

const experienceData = [
  {
    id: 1,
    title: 'Senior Full Stack Web Engineer @ SeekingAlpha',
    years: "09/2021 - Present",
    content: <div>
      <p>Worked in a fully remote distributed team (40+ developers) to develop and maintain large-scale e-commerce web system for publishers using Ruby on Rails and ReactJS.</p>

      <p><strong>Responsibilities:</strong></p>
      <ul>
        <li>Help architect core parts of our infrastructure from the ground up in a reliable way</li>
        <li>Participate in design and planning discussions, and contribute architectural ideas</li>
        <li>Develop API for modern cross-platform responsible SPA from the ground up</li>
        <li>Overseeing the work of developers, reviewing pull requests</li>
        <li>Write highly scalable, reusable, and testable code</li>
        <li>Optimize application for maximum speed and performance</li>
        <li>Sailthru (Marigold Engage) integration</li>
        <li>PayPal/Stripe payment system integration</li>
        <li>Improve SEO</li>
      </ul>

      <strong>Achievements:</strong>
      <ul>
        <li>Reduced the development time, and increased stability and scalability of the platform by integration of the modular application architecture</li>
        <li>Improved API performance by 8% by optimizing database queries, reducing page load times, and implementing caching strategies</li>
        <li>Analyzed and improved application efficiency by 8% optimizing database queries, implementing caching strategies and code refactoring</li>
        <li>Resolved critical issues. I have successfully resolved critical issues that impacted the functionality and user experience of the platform. This involved identifying the root cause of the issue, implementing a fix, and testing the solution to ensure that it resolved the problem</li>
        <li>Implemented OTP user login</li>
      </ul>
    </div>,
  },
  {
    id: 2,
    title: 'Technical Consultant / Senior Full Stack Web Engineer @ The Skills',
    years: "11/2020 - 12/2021",
    content: <div>
      <p>
        Acted as the Technical Consultant in a fully remote distributed team at the startup company for the video-based educational platform.
        The solution includes an administrator panel, customer web application, and REST API based on the Ruby On Rails / NextJs framework.
        Worked as a fullstack developer as part of a 4 people team on the solution for the marketing website using the NextJs framework.
      </p>

      <p><strong>Responsibilities:</strong></p>
      <ul>
        <li>Collaborate with the product and marketing managers to find suitable solutions</li>
        <li>Ensure the features met the requirements and expectations of stakeholders</li>
        <li>Oversee the work of developers, conduct code reviews, and help colleagues troubleshoot their code</li>
        <li>Identify, conceptualize, and launch new initiatives</li>
        <li>3rd party services integration</li>
        <li>Payment processor integration</li>
        <li>Build user authentication and authorization solution</li>
        <li>Data storage modeling and architecture</li>
        <li>Design RESTful API’s endpoints</li>
        <li>Code Review, product data repair, bug monitoring and quick response to customer service feedback</li>
      </ul>

      <p><strong>Achievements:</strong></p>
      <ul>
        <li>Developed from scratch a web platform for education platform as a lead developer in a team of 4</li>
        <li>Participated in every step of the product development process - from the idea through development and improvement</li>
        <li>Built user authentication and authorization solution based on JWT tokens integrated login with Google, Facebook, Apple</li>
        <li>Designed the system in a modular way (admin, marketing site, customer application, API) resulting in reducing maintenance time and costs by 27%</li>
        <li>Developed and integrated RESTful API's for Web and Mobile applications</li>
        <li>Designed and implemented database architecture for applications using Postgres</li>
        <li>Successfully integrated  Apple/Android In-App purchases, which increased customer funnel up to 7%</li>
        <li>Built video content delivery solution based on the Brightcove platform</li>
        <li>Integrated Stripe for credit card payments and PayPal payment processors. In addition integrated Apple/Android In-App purchases for the mobile application</li>
        <li>Implemented from scratch JSON REST API using the latest best practices</li>
        <li>Covered with the API documentation 100% of the API endpoints using Swagger</li>
        <li>Achieved 83 % of code test coverage</li>
        <li>Took part in the process of A/B testing experiments. That included helping in designing a feature, releasing it, getting statistics on its usage and then tweaking it or rolling back</li>
        <li>Implemented scalable high-performed data storage system using Postgres + Redis</li>
      </ul>
    </div>,
  },
  {
    id: 3,
    title: "Senior Full-Stack developer / Technical lead @ Sloboda Studio",
    years: "08/2019 - 11/2020",
    content: <div>
      <p>TBD</p>

      <p><strong>Responsibilities:</strong></p>
      <ul>
        <li>Manage projects with agile methodologies in JIRA via user stories and customer issues</li>
        <li>Coordinate teams of programmers and supervise the development process</li>
        <li>Work closely with customers directly on product development and provide product support</li>
        <li>Determining the underlying architecture for the software</li>
        <li>Overseeing the work of developers, reviewing pull requests</li>
        <li>Mentoring new staff, train and supervise developers</li>
        <li>Help new employees to become familiar with teamwork, early guidance and team integration</li>
        <li>Serving as technical adviser to managers and clients</li>
        <li>Requirement gathering and analysis</li>
        <li>Drive and lead technical initiatives to keep company up-to-date with best practices</li>
        <li>Improve engineering standards, tooling, and processes</li>
        <li>Lead daily customer service and technical team docking meetings to set up internal docking process</li>
      </ul>

      <p><strong>Achievements:</strong></p>
      <ul>
        <li>Hired, trained and lead Agile team of 5 full-stack developers</li>
        <li>Integrated CD flow using GitlabCI pipelines, reducing the code delivery time to 33%</li>
        <li>Designed and developed applications for over 4 clients using Ruby On Rails, React, AWS</li>
        <li>Oversaw and completed various major new client on-boarding procedures</li>
        <li>Shortened new project/feature estimation timelines by using a brand new estimation template, which improved
          the efficiency of operating by 30%
        </li>
        <li>Designed and implemented Company new developers hiring/on-boarding process for the use of over 15
          employees
        </li>
        <li>Revamped and reorganized the company-wide tech meetings, which got talent growth boost up to 11%</li>
      </ul>
    </div>,
  },
  {
    id: 4,
    title: "Senior Full-Stack developer / Technical lead @ Apriorit",
    years: "01/2019 - 08/2019",
    content: <div>
      <p>
        Worked on secure, flexible and adaptable identity and access management platform components with full software development cycle - requirements analysis, design, implementation, testing, deployment and technical support.
      </p>

      <p><strong>Responsibilities:</strong></p>
      <ul>
        <li>Perform the technical lead role overseeing the development of a multi-factor adaptive authentication and access management solution</li>
        <li>Keep the team focused on the project and moving toward reaching its goal - engage, motivate and take care of their needs and maintain a friendly and productive work environment</li>
        <li>High-level project road-map planning</li>
        <li>Providing technical expertise and guidance to team members. Assisting in problem-solving, code reviews, and architectural decisions</li>
        <li>Mentor and guide  junior software developers on design patterns and development best practices</li>
        <li>Document solutions by developing documentation, flowcharts, layouts, DB diagrams, charts, code comments, and clear testable code</li>
        <li>Participate in daily stand-ups, software design sessions, code reviews, and sprint retrospectives</li>
        <li>Translate Agile requirements into conceptual and detailed designs</li>
      </ul>

      <p><strong>Achievements:</strong></p>
      <ul>
        <li>Successfully performed code audit to meet the SOC2 application certification. Audit included - Security, Availability, Processing Integrity, Confidentiality, Privacy</li>
        <li>Managed team with 6 developers in 3 projects for 1 client</li>
        <li>Contributed over 30 new components to the in-house UI Storybook library to create reusable React components</li>
        <li>Handled multiple languages/frameworks development</li>
      </ul>
    </div>,
  },
];

function Experiences() {
  return (
    <section id="experience">
      <div className="container">
        <Pagetitle title="Experience" />
        <div className="row">
          <div className="col-md-12">
            <div className="spacer d-md-none d-lg-none" data-height="30"></div>
            <div className="timeline exp bg-white rounded shadow-dark padding-30 overflow-hidden">
              {experienceData.map((experience) => (
                <Timeline key={experience.id} education={experience} />
              ))}
              <span className="line"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experiences;
