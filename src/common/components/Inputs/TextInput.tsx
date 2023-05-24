type Props = {
  inputName?: string,
  className?: string,
  value: string,
  changeHandler: React.ChangeEventHandler,
};

export default function TextInput({ 
  inputName,
  className,
  value, 
  changeHandler 
}: Props) {
  return (
    <div className={className}>
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
    </div>
  );
};
