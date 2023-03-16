import React from 'react';
import './Navbar.scss';

const Navbar = ({ createHandler, downloadHandler }) => {

  return (
    <nav id='Navbar'>
      <button onClick={createHandler} className='onclick'>
        NEW
      </button>
      <button onClick={downloadHandler} className='onclick'>
        DOWNLOAD
      </button>
    </nav>
  );
};

export default Navbar;
