import React from 'react';
import {FaHome} from 'react-icons/fa';

const NavHome = () => {
  return (
    <a className='NavHome' href='/' target='_blank'>
      <FaHome size={60} />
    </a>
  );
};

export default NavHome;
