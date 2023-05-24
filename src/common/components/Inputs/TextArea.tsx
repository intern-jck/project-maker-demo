type Props = {
  inputName?: string,
  className?: string,
  value: string,
  changeHandler: React.ChangeEventHandler,
};

export default function TextArea({ className, inputName, value, changeHandler }: Props) {
  return (
    <div className={className}>
      <label htmlFor={inputName}>
        {inputName ? inputName.toUpperCase() : ''}
      </label>
      <textarea
        name={inputName}
        value={value}
        onChange={changeHandler}
      />
    </div>
  );
};