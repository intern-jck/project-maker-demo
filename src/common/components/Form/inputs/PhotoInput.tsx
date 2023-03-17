import React from 'react';
import TextInput from './TextInput.jsx';
import { CgAddR, CgCloseR } from 'react-icons/cg';

const PhotoInput = ({ name, value, photos, changeHandler, addHandler, deleteHandler }) => {
  return (
    <div className='PhotoInput'>

      <div className='form-photo-input'>
        <TextInput
          name={name}
          value={value}
          changeHandler={changeHandler}
        />
        <button onClick={addHandler}>
          <CgAddR />
        </button>
      </div>

      <div className='form-photo-list'>
        {
          photos.map((photo, i) => {
            return (
              <div key={i} className='form-photo-thumb'>
                <button className='form-photo-delete-btn' onClick={deleteHandler} data-photo-index={i}>
                  <CgCloseR />
                </button>
                <img src={photo} />
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default PhotoInput;
