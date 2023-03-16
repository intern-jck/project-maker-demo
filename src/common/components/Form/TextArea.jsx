import React from 'react';

const TextArea = ({ name, rows, cols, value, changeHandler }) => {
  return (
    <label className='TextArea'>
      {name}
      <textarea
        name={name}
        rows={rows}
        cols={cols}
        value={value}
        onChange={changeHandler}
      />
    </label>
  );
};

export default TextArea;
