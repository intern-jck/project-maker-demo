import React from 'react';

type TextInputType = {
  name: string,
  value: string,
  changeHandler: Function,
}

type Props = {
  inputProps: TextInputType;
}
// { inputProps }: Props
export default function TextInput() {

  return (
    <>
      <div>
        <h2>TEXT INPUT TEST</h2>
        <label>
          TEST LABEL
          <input type='text' placeholder='text-input' />
        </label>
      </div>
      {/* <label className='TextInput'>
        {name}
        <input
          type='text'
        // name={name}
        // value={value}
        // onChange={changeHandler}
        />
      </label> */}
    </>
  );
};
