import React from 'react';
import Slider from 'react-slick';

import Pagetitle from 'components/elements/Pagetitle';
import Testimonial from 'components/elements/Testimonial';

import JeniaZelkindImage from 'images/testimonials/jenia_zelkind.jpeg';
import YuliaIoffeImage from 'images/testimonials/yulia_ioffe.jpeg';

const sliderData = [
  {
    id: 1,
    avatar: JeniaZelkindImage,
    userName: 'Jenia Zelkind',
    subtitle: 'Software Engineer at ***',
    review:
      `<p>
        I wholeheartedly recommend Andrii for any software development role and have no 
        doubt that he will excel in any project he undertakes!
      </p>
      <p>
        I had the pleasure of working with Andrii for a year, and during that time, 
        I was consistently impressed with his exceptional skills in Ruby and his solid 
        front-end development abilities.
      </p>
      <p>
        He is thorough in his work, incredibly hard-working and makes the effort to identify 
        and address potential issues, even when they are not directly related to the 
        work assigned to him.
      </p>
      <p>
        Beyond his technical skills, Andrii maintains a positive and collaborative attitude, 
        and he has excellent communication skills. I truly enjoyed working with him.
      </p>`,
  },
  {
    id: 2,
    avatar: YuliaIoffeImage,
    userName: 'Yulia Ioffe',
    subtitle: 'Backend Software EngineerBackend Software Engineer',
    review:
      `<p>
        I'm thrilled to recommend Andrii as an exceptional developer. I had the pleasure 
        of working closely with Andrii on a project, and I must say, he's one of the 
        sharpest minds I've come across. Not only is Andrii highly intelligent, but he's 
        also genuinely nice and easy to collaborate with.
      </p>
      <p>
        What impressed me the most about Andrii is his remarkable speed and efficiency in 
        completing tasks. He has an incredible knack for swiftly tackling challenges and 
        delivering results.
      </p> 
      <p>
        One thing that stood out to me about Andrii is his dedication to ensuring the 
        reliability and functionality of his code. I greatly appreciated his insistence 
        on thorough integration testing before handing over the work to the QA team. 
        This level of attention to detail not only saved time but also contributed to 
        the overall quality of the project.
      </p>
      <p>
        Moreover, Andrii possesses a remarkable ability to quickly grasp new subjects. 
        I was amazed by his short onboarding time when faced with unfamiliar technologies 
        or concepts. Andrii's aptitude for rapidly adapting to new environments and 
        acquiring knowledge is a valuable asset.
      </p>
      <p>
        In summary, I wholeheartedly recommend Andrii as a highly skilled developer. 
        His intelligence, amiable personality, and swift task completion make him a 
        standout colleague. Andrii's commitment to quality, proactive approach to testing, 
        and remarkable adaptability position him as a valuable asset to any development team.
      </p>`,
  },
  {
    id: 3,
    avatar: 'images/avatar-3.svg',
    userName: 'John Doe',
    subtitle: 'Product designer at Dribbble',
    review:
      'I enjoy working with the theme and learn so much. You guys make the process fun and interesting. Good luck! 👍',
  },
];

function Testimonials() {
  const slidetSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section id="testimonials">
      <div className="container">
        <Pagetitle title="Clients & Review" />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Slider {...slidetSettings} className="testimonials-wrapper">
          {sliderData.map((slider) => (
            <Testimonial key={slider.id} slider={slider} />
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default Testimonials;
