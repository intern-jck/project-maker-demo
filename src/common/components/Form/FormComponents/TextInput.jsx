import React from 'react';

const TextInput = ({ name, value, changeHandler }) => {
  return (
    <label className='TextInput'>
      {name}
      <input
        type='text'
        name={name}
        value={value}
        onChange={changeHandler}
      />
    </label>
  );
};

export default TextInput;
