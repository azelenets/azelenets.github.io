import React from "react";
import Pagetitle from "../elements/Pagetitle";
import Timeline from "../elements/Timeline";

const educationData = [
  {
    id: 1,
    title: "Master of Science, Dnipro Polytechnic",
    years: "2012 - 2015",
    content: "Computerized control systems and process automation.",
  },
  {
    id: 2,
    title: "Polytechnical College, Dnipro Polytechnical College",
    years: "2009 - 2012",
    content: "Installation, commissioning, and repairment of the industrial automated control systems.",
  },
];

function Education() {
  return (
    <section id="experience">
      <div className="container">
        <Pagetitle title="Education" />
        <div className="row">
          <div className="col-md-12">
            <div className="timeline edu bg-white rounded shadow-dark padding-30 overflow-hidden">
              {educationData.map((education) => (
                <Timeline key={education.id} experience={education} />
              ))}
              <span className="line"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
