import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Auricle App</h1>
      <nav>
        <ul>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
          {/* <li><Link to="/user">User</Link></li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Home;
