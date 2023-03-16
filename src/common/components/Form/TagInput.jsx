import React from 'react';
import TextInput from './TextInput.jsx';
import { CgAddR, CgCloseR } from 'react-icons/cg';

const TagInput = ({ name, value, tags, changeHandler, addHandler, deleteHandler }) => {
  return (
    <div className='TagInput'>

      <div className='form-tag-input'>
        <TextInput
          name={name}
          value={value}
          changeHandler={changeHandler}
        />
        <button onClick={addHandler}>
          <CgAddR />
        </button>
      </div>

      <div className='form-tag-list'>
        {
          tags.map((tag, i) => {
            return (
              <div key={i} className='form-tag'>
                <a href={tag[1]} target='_blank'>{tag[0]}</a>
                <button className='form-tag-delete-btn' onClick={deleteHandler} data-photo-index={i}>
                  <CgCloseR />
                </button>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default TagInput;
