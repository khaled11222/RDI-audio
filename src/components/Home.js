import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Audio Echo App</h1>
      <p>General description of the service.</p>
      <Link to="/echo">
        <button>Go to Echo Page</button>
      </Link>
    </div>
  );
};

export default Home;
