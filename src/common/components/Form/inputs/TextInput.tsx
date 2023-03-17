// import React from 'react';

type TextInputType = {
  name: string,
  value: string,
  changeHandler: Function,
};

type Props = {
  name: string,
  value: string,
  changeHandler: Function,
};

export default function TextInput({ name, value, changeHandler }: Props) {
  return (
    <>
      <label>
        Name
        <input
          type='text'
          name={name}
          value={value}
          placeholder={name}
          onChange={changeHandler}
        />
      </label>
    </>
  );
};
