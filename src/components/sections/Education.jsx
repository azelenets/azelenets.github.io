import React from 'react';

import educationDpc from 'json/education/00-dpc.json';
import educationDpu from 'json/education/01-dpu.json';

import Pagetitle from 'components/elements/Pagetitle';
import Timeline from 'components/elements/Timeline';

function Education() {
  const educationData = [
    educationDpu,
    educationDpc,
  ];

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
              <span className="line" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
