import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import Disqus from 'disqus-react';

import Header from 'components/layouts/Header';

function BlogDetails({ match: { params } }) {
  const [content, setContent] = useState('');
  const { id: blogId, title: blogFile } = params;

  useEffect(() => {
    import(`../blogs/${blogFile}.md`)
      .then((res) => res.default)
      .then((res) => {
        fetch(res)
          .then((result) => result.text())
          .then((result) => setContent(result));
      });
  }, [content, blogFile]);

  const disqusShortname = 'bolby'; // found in your Disqus.com dashboard
  const disqusConfig = {
    url: 'https://jthemes.net/themes/react/bolby', // Homepage link of this site.
    identifier: blogId,
    title: blogFile,
  };

  const [toggleMenu, setToggleMenu] = useState(false);

  const headerToggler = (e) => {
    e.preventDefault();
    setToggleMenu(!toggleMenu);
  };

  document.addEventListener('click', (e) => {
    if (e.target.closest('.content')) {
      setToggleMenu(false);
    }
  });

  // document.body.classList.add("dark");
  // Uncomment the above line if you use dark version

  return (
    <>
      <Header
        logoSource="/images/logo.svg"
        toggleMenu={toggleMenu}
        headerToggler={headerToggler}
      />
      <main className={toggleMenu ? 'content open' : 'content'}>
        <div className="spacer" data-height="96" />
        <div className="blog-page-section">
          <div className="container">
            <div className="blog-single shadow-dark p-30">
              <Markdown>{content}</Markdown>
              <div className="mi-blog-details-comments mt-30">
                <Disqus.DiscussionEmbed
                  shortname={disqusShortname}
                  config={disqusConfig}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="spacer" data-height="96" />
      </main>
    </>
  );
}

BlogDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default BlogDetails;
