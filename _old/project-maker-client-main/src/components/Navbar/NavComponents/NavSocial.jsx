import React from 'react';
import {FaGithub, FaYoutube, FaInstagram} from 'react-icons/fa';

const NavSocial = () => {
  return (
    <div className='NavSocial'>
      <a href='#' target='_blank'>
        <FaGithub size={60}/>
      </a>
      <a href='#' target='_blank'>
        <FaYoutube size={60}/>
      </a>
      <a href='#' target='_blank'>
        <FaInstagram size={60}/>
      </a>
    </div>
  );
};

export default NavSocial;
