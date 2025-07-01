import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container container">
      <div className="about-content content-card">
        <h2>40 Years of Cranford Publications</h2>
        
        <div className="about-section">
          <p>
            <strong>2019 marked Cranford's 40th Year Publishing.</strong>
          </p>
          <p className="intro-text">
            Paul Cranford receiving the Katherine McLennan Award, an acknowledgement of contribution to culture and historical preservation on Cape Breton.
          </p>
        </div>

        <div className="about-section">
          <h3>Our History & Specialization</h3>
          <p>
            In 1979 Cranford's work began with a reissue of a classic 19th century Scottish compilation, The Skye Collection.
          </p>
          <p>
            Cranford Publications specializes in Celtic fiddle music from Cape Breton, Ireland and Scotland. Proprietor Paul Stewart Cranford is a fiddler, composer and retired lightousekeeper well-grounded in the traditions of music he sells, performs and arranges.
          </p>
        </div>

        <div className="about-section">
          <h3>Our Mission & Future</h3>
          <p>
            This site provides resources for a continuing tradition by supplying books of music notation and related recordings.
          </p>
          <p>
            The secure online store has remained more or less the same since 1999. Working alone, as time permits I plan to upgrade the look, feel and functionality of the store and website eventually making it mobile friendly. I am also looking at making publications available digitally.
          </p>
          <p>
            As you explore the site you will find links to thousands of tunes. Check out any page which features a book or CD that interests you - on most you will find links to tunes. As CDs go out of print I still post support material as free, on-screen musical notation and sound clips or link to articles, photos and descriptions - all relating to books and CDs which we make or have made available in our on-line store.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About; 