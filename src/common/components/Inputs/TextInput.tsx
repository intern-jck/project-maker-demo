type Props = {
  name: string,
  value: string,
  changeHandler: React.ChangeEventHandler,
};

export default function TextInput({ name, value, changeHandler }: Props) {
  return (
    <div className='text-input'>
      <label htmlFor={name}>
        {name.toUpperCase()}
      </label>
      <input
        type='text'
        name={name}
        value={value}
        placeholder={name}
        onChange={changeHandler}
      />
    </div>
  );
};
