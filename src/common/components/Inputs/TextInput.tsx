type Props = {
  inputName?: string,
  value: string,
  changeHandler: React.ChangeEventHandler,
};

export default function TextInput({ 
  inputName, 
  value, 
  changeHandler 
}: Props) {
  return (
    <>
      <label htmlFor={inputName}>
        {inputName ? inputName.toUpperCase() : ''}
      </label>
      <input
        type='text'
        name={inputName}
        value={value}
        placeholder={inputName}
        onChange={changeHandler}
      />
    </>
  );
};
