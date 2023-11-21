import React from 'react';
import PropTypes from 'prop-types';
import ScrollAnimation from 'react-animate-on-scroll';
import { Link } from 'react-router-dom';

function Blog({ blogData }) {
  const {
    id, category, title, date, author, image, filesource,
  } = blogData;
  const getNospaceTitle = (fileSource) => {
    const tempArr = fileSource.split('/');
    const fileName = tempArr[tempArr.length - 1];
    const getName = fileName.slice(0, -3);
    return getName;
  };
  return (
    <ScrollAnimation
      animateIn="fadeInUp"
      animateOut="fadeInOut"
      animateOnce
    >
      <div className="blog-item rounded bg-white shadow-dark">
        <div className="thumb">
          <a href="!#">
            <span className="category">{category}</span>
          </a>
          <Link to={`blogs/blog-details/${id}/${getNospaceTitle(filesource)}`}>
            <img src={image} alt="blog-title" />
          </Link>
        </div>
        <div className="details">
          <h4 className="my-0 title">
            <Link
              to={`blogs/blog-details/${id}/${getNospaceTitle(filesource)}`}
            >
              {title}
            </Link>
          </h4>
          <ul className="list-inline meta mb-0 mt-2">
            <li className="list-inline-item">{date}</li>
            <li className="list-inline-item">{author}</li>
          </ul>
        </div>
      </div>
    </ScrollAnimation>
  );
}

Blog.propTypes = {
  blogData: PropTypes.shape({
    id: PropTypes.string,
    category: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    author: PropTypes.string,
    image: PropTypes.string,
    filesource: PropTypes.string,
  }).isRequired,
};

export default Blog;
