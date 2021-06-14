import React from 'react';
import {NavLink} from "react-router-dom";

/*--------------------------/
NAVLINKS STATELESS COMPONENT
    links nav buttons
    to proper urls
/--------------------------*/

const NavLinks = () => {

  return (
  <nav className="main-nav">
    <ul>
      <li> <NavLink to="/Cats"> Cats </NavLink> </li>
      <li> <NavLink to="/Guitars"> Guitars </NavLink> </li>
      <li> <NavLink to="/Coffee"> Coffee </NavLink> </li>
    </ul>
  </nav>
  );
}

export default NavLinks;