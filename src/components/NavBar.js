import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav>
    <Link to="/">courses</Link>
    <Link to="/tutors">tutors</Link>
    <Link to="/students">students</Link>
    <Link to="/querys">querys</Link>
  </nav>
);

export default NavBar;
