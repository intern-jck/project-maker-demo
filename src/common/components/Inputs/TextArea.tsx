type Props = {
  className?: string,
  inputName?: string,
  value: string,
  changeHandler: React.ChangeEventHandler,
};

export default function TextArea({ className, inputName, value, changeHandler }: Props) {
  return (
    <label className={className}>
      <label htmlFor={inputName}>
        {inputName ? inputName.toUpperCase() : ''}
      </label>
      <textarea
        name={inputName}
        value={value}
        onChange={changeHandler}
      />
    </label>
  );
};