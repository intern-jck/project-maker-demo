
type Props = {
  name: string,
  value: string,
  changeHandler: React.ChangeEventHandler,
};

const TextArea = ({ name, value, changeHandler }: Props) => {
  return (
    <label className='TextArea'>
      {name.toUpperCase()}
      <textarea
        name={name}
        value={value}
        onChange={changeHandler}
      />
    </label>
  );
};

export default TextArea;
