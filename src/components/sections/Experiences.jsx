import React from 'react';
import Pagetitle from '../elements/Pagetitle';
import Timeline from '../elements/Timeline';

import gipromezExperience from '../../json/experience/00-gipromez.json';
import cSoftExperience from '../../json/experience/01-csoft.json';
import agilieExperience from '../../json/experience/02-agilie.json';
import gridDynamicsExperience from '../../json/experience/03-griddynamics.json';
import loopMeExperience from '../../json/experience/04-loopme.json';
import yalantisExperience from '../../json/experience/05-yalantis.json';
import aprioritExperience from '../../json/experience/06-apriorit.json';
import slobodaStudioExperience from '../../json/experience/07-sloboda-studio.json';
import theSkillsExperience from '../../json/experience/08-the-skills.json';
import seekingAlphaExperience from '../../json/experience/09-seekingalpha.json';

const preprocessExperience = (experience = {}) => {
  const {
    companyName, companyWebsite, position, contentParagraphs, ...processedExperience
  } = experience;

  processedExperience.content = contentParagraphs.map(
    // eslint-disable-next-line react/no-array-index-key
    (content, index) => <p key={`${processedExperience.id}-content-paragraph-${index}`}>{content}</p>,
  );
  processedExperience.title = (
    <>
      {position}
      {' '}
      <a href={companyWebsite} rel="noreferrer" target="_blank">
        @
        {companyName}
      </a>
    </>
  );

  return processedExperience;
};

function Experiences() {
  const experienceData = [
    seekingAlphaExperience,
    theSkillsExperience,
    slobodaStudioExperience,
    aprioritExperience,
    yalantisExperience,
    loopMeExperience,
    gridDynamicsExperience,
    agilieExperience,
    cSoftExperience,
    gipromezExperience,
  ];

  return (
    <section id="experience">
      <div className="container">
        <Pagetitle title="Experience" />
        <div className="row">
          <div className="col-md-12">
            <div className="spacer d-md-none d-lg-none" data-height="30" />
            <div className="timeline exp bg-white rounded shadow-dark padding-30 overflow-hidden">
              {experienceData.map((experience) => (
                <Timeline key={experience.id} experience={preprocessExperience(experience)} />
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
