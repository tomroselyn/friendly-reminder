import React from 'react';
import { Link } from 'react-router-dom';
import NavMenu from './NavMenu.js';
import './Nav.css';

const Nav = () => (
  <div className="nav">
    <NavMenu />
    <Link className="nav-link" to="/dashboard">
      <h2 className="nav-title">friendly reminder</h2>
    </Link>
  </div>
);

export default Nav;
