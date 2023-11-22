import React, { useState, useEffect } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import Pagetitle from '../elements/Pagetitle';
import Portfolio from '../elements/Portfolio';

const filters = [
  {
    id: 1,
    text: 'All',
  },
  {
    id: 2,
    text: 'E-Commerce',
  },
  {
    id: 3,
    text: 'Multimedia',
  },
  {
    id: 4,
    text: 'Navigation',
  },
  {
    id: 5,
    text: 'Security',
  },
  {
    id: 6,
    text: 'Recruitment',
  },
  {
    id: 7,
    text: 'Non-profit',
  },
  {
    id: 8,
    text: 'Advertisement',
  },
  {
    id: 9,
    text: 'Marketplace',
  },
  {
    id: 10,
    text: 'Education',
  },
];

const allData = [
  {
    id: 1,
    title: 'Shark Taxi',
    category: 'Navigation',
    image: 'images/works/1.svg',
    popupLink: ['images/works/1.svg'],
  },
  {
    id: 2,
    title: 'NDA',
    category: 'Security',
    image: 'images/works/2.svg',
    popupLink: [
      'images/works/2.svg',
      'images/works/5.svg',
      'images/works/6.svg',
    ],
  },
  {
    id: 3,
    title: 'LoopMe',
    category: 'Advertisement',
    image: 'images/works/3.svg',
    popupLink: ['https://www.youtube.com/watch?v=qf9z4ulfmYw'],
  },
  {
    id: 4,
    title: 'NowShop',
    category: 'Marketplace',
    image: 'images/works/4.svg',
    popupLink: [
      'https://www.youtube.com/watch?v=URVHRhBSjj8',
      'https://www.youtube.com/watch?v=qf9z4ulfmYw',
    ],
  },
  {
    id: 5,
    title: 'SeekingAlpha',
    category: 'Marketplace',
    image: 'images/works/5.svg',
    popupLink: ['images/works/5.svg'],
  },
  {
    id: 6,
    title: 'The Skills',
    category: 'Education',
    image: 'images/works/6.svg',
    link: 'https://dribbble.com',
  },
  {
    id: 7,
    title: 'WorldBibleSchool',
    category: 'Non-profit',
    image: 'images/works/3.svg',
    link: 'https://pinterest.com',
  },
  {
    id: 8,
    title: 'The Walk',
    category: 'Non-profit',
    image: 'images/works/1.svg',
    popupLink: ['images/works/1.svg'],
  },
];

function Works() {
  const [getAllItems] = useState(allData);
  const [dataVisibleCount, setDataVisibleCount] = useState(6);
  const [dataIncrement] = useState(3);
  const [activeFilter, setActiveFilter] = useState('');
  const [visibleItems, setVisibleItems] = useState([]);
  const [noMorePost, setNoMorePost] = useState(false);

  useEffect(() => {
    setActiveFilter(filters[0].text.toLowerCase());
    setVisibleItems(getAllItems.filter((item) => item.id <= 6));
  }, [getAllItems]);

  const handleChange = (e) => {
    e.preventDefault();
    setActiveFilter(e.target.textContent.toLowerCase());
    let tempData;
    if (e.target.textContent.toLowerCase() === filters[0].text.toLowerCase()) {
      tempData = getAllItems.filter((data) => data.id <= dataVisibleCount);
    } else {
      tempData = getAllItems.filter(
        (data) => data.category === e.target.textContent.toLowerCase()
          && data.id <= dataVisibleCount,
      );
    }
    setVisibleItems(tempData);
  };

  const handleLoadmore = (e) => {
    e.preventDefault();
    const tempCount = dataVisibleCount + dataIncrement;
    if (dataVisibleCount > getAllItems.length) {
      setNoMorePost(true);
    } else {
      setDataVisibleCount(tempCount);
      if (activeFilter === filters[0].text.toLowerCase()) {
        setVisibleItems(getAllItems.filter((data) => data.id <= tempCount));
      } else {
        setVisibleItems(
          getAllItems.filter(
            (data) => data.category === activeFilter && data.id <= tempCount,
          ),
        );
      }
    }
  };

  return (
    <section id="works">
      <div className="container">
        <Pagetitle title="Recent Projects" />

        {/* Start Portfolio Filters */}
        <ScrollAnimation
          animateIn="fadeInUp"
          animateOut="fadeInOut"
          animateOnce
        >
          <ul className="portfolio-filter list-inline">
            {filters.map((filter) => (
              <li className="list-inline-item" key={filter.id}>
                <button
                  type="button"
                  onClick={handleChange}
                  className={
                    filter.text.toLowerCase() === activeFilter
                      ? 'text-capitalize current'
                      : 'text-capitalize'
                  }
                >
                  {filter.text}
                </button>
              </li>
            ))}
          </ul>
        </ScrollAnimation>
        {/* End Portfolio Filters */}

        {/* Start Portfolio Items */}
        <div className="row portfolio-wrapper">
          {visibleItems.map((item) => (
            <div className="col-md-4 col-sm-6 grid-item" key={item.id}>
              <Portfolio portfolio={item} />
            </div>
          ))}
        </div>
        {/* End Portfolio Items */}

        <div className="load-more text-center mt-4">
          <button
            type="button"
            className="btn btn-default"
            onClick={handleLoadmore}
            disabled={noMorePost ? 'disabled' : null}
          >
            {noMorePost ? (
              'No more items'
            ) : (
              <span>
                <i className="fas fa-spinner" />
                {' '}
                Load more
              </span>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Works;
