type Props = {
  name: string,
  value: string,
  changeHandler: React.ChangeEventHandler,
};

export default function TextInput({ name, value, changeHandler }: Props) {
  return (
    <>
      <label className={'textInput'}>
        {name.toUpperCase()}
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
