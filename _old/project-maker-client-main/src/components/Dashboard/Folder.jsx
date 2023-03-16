import React from 'react';
import { CgFolder } from 'react-icons/cg';

const Folder = ({ clickHandler, id, name }) => {

  return (
    <div className="Folder">
      <button
        className='folder-btn'
        onClick={clickHandler}
        data-proj-id={id}
      >
        <CgFolder
          className="folder-icon"
        />
        <span className='folder-text'>{name}</span>
      </button>
    </div>
  );

};

export default Folder;
