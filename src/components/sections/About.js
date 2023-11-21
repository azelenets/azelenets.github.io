import React from "react";
import TrackVisibility from "react-on-screen";
import Counter from "../elements/Counter";
import Pagetitle from "../elements/Pagetitle";
import Skill from "../elements/Skill";
import avatarImage from "../../images/avatar-without-bg.png";

const aboutContent = {
  avatarImage,
  content:
    <div>
      <p>
        Dynamic and highly skilled Computerized Systems Engineer with a Master's degree in "Computer Systems Control and Automation" and over 12 years of proven success in commercial software development. A results-oriented professional known for:
      </p>

      <ul>
        <li>
          <strong>Engineering Excellence:</strong> Demonstrated strong expertise in developing end-to-end solutions, managing complexities within vast ecosystems, and leading engineering research initiatives.
        </li>
        <li>
          <strong>Innovative Solutions:</strong> Proficient in creating tech designs, overseeing the implementation of proof of concepts (POCs), and ensuring alignment with stakeholders to drive successful project outcomes.
        </li>
        <li>
          <strong>Team Collaboration:</strong> A dedicated team player with exceptional communication and interpersonal skills. Proven ability to collaborate effectively within multidisciplinary teams to achieve project objectives.
        </li>
        <li>
          <strong>Strategic Leadership:</strong> Extensive background in building robust tech foundations, leading engineering efforts, and navigating the challenges of large-scale ecosystems.
        </li>
      </ul>
    </div>,
  name: "Andrew Zelenets",
};

const progressData = [
  {
    id: 1,
    title: "Management Skills", // Time, Risk management, Delegation, Deadline, Multi-tasking
    percentage: 95,
    progressColor: "#FFD15C",
  },
  {
    id: 2,
    title: "Communication Skills", // Active listening, Attention to detail, Presentation, Leadership, Mentoring
    percentage: 94,
    progressColor: "#FF4C60",
  },
  {
    id: 3,
    title: "Technical Skills", // DevOps and CI/CD, API development, Databases and ORM, Web Security Best Practices
    percentage: 80,
    progressColor: "#6C6CE5",
  },
  {
    id: 4,
    title: "Programming Skills", // Software Architecture,  Front-end development, Back-end development, Testing and Debugging,
    percentage: 80,
    progressColor: "#6C6CE5",
  },
];

const counterData = [
  {
    id: 1,
    title: "Projects completed",
    count: 198,
    icon: "icon-fire",
  },
  {
    id: 2,
    title: "Cup of coffee",
    count: 5670,
    icon: "icon-cup",
  },
  {
    id: 3,
    title: "Satisfied clients",
    count: 427,
    icon: "icon-people",
  },
  {
    id: 4,
    title: "Nominees winner",
    count: 35,
    icon: "icon-badge",
  },
];

function About() {
  return (
    <section id="about">
      <div className="container">
        <Pagetitle title="About Me" />
        <div className="row">
          <div className="col-md-12 triangle-left-md triangle-top-sm">
            <div className="rounded bg-white shadow-dark padding-30">
              <div className="row">
                <div className="col-md-9">
                  {aboutContent.content}
                  <div className="mt-3">
                    <a href="!#" className="btn btn-default">
                      Download CV
                    </a>
                  </div>
                  <div
                    className="spacer d-md-none d-lg-none"
                    data-height="30"
                  ></div>
                </div>
                <div className="col-md-3">
                  {progressData.map((progress) => (
                    <TrackVisibility
                      once
                      key={progress.id}
                      className="progress-wrapper"
                    >
                      <Skill progress={progress} />
                    </TrackVisibility>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="spacer" data-height="70"></div>
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
