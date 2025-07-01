import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container container">
      <div className="content-card">
        <div className="home-content-grid">
          <div className="welcome-text">
            <h2>2019 marked Cranford's 40th Year Publishing</h2>
            <p className="subtitle">
              Paul Cranford receiving the Katherine McLennan Award, an acknowledgement of contribution to culture and historical preservation on Cape Breton.
            </p>
            <p>
              Cranford Publications specializes in Celtic fiddle music from Cape Breton, Ireland and Scotland. Proprietor Paul Stewart Cranford is a fiddler, composer and retired lightousekeeper well-grounded in the traditions of music he sells, performs and arranges.
            </p>
          </div>
          <div className="welcome-image">
            <img src={`${process.env.PUBLIC_URL}/images/ReceivingMcLennan.jpg`} alt="Paul Cranford receiving an award" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 