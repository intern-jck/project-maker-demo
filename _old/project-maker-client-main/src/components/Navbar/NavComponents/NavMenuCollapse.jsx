import React, {useState, useEffect} from 'react';
import NavBrand from './NavBrand.jsx';
import NavMenu from './NavMenu.jsx';

import {GiHamburgerMenu, GoX} from 'react-icons/gi';

const NavMenuCollapse = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  return (
    <div className='NavMenuCollapse'>
      <div className='nav-collapse-header'>
        <button className='nav-ham-btn' onClick={toggleMenu}>
          <GiHamburgerMenu size={60}
            style={showMenu ?
            {transform: 'rotate(90deg)'} : {transform: 'rotate(0deg)'}} />
        </button>
        {/* <NavSocial /> */}
      </div>
      {
        showMenu ?
        <>
          <NavMenu />
        </> : null
      }
    </div>
  );
};

export default NavMenuCollapse;
