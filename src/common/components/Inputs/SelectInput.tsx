type Props = {
  name: string,
  value: string,
  options: string[],
  changeHandler: React.ChangeEventHandler,
};

export default function Select({ name, value, options, changeHandler }: Props) {
  return (
    <>
      <label htmlFor={name}>
        {name.toUpperCase()}
      </label>
      <select
        name={name}
        value={value}
        onChange={changeHandler}
      >
        <option key={0} value='default'>{name}</option>
        {
          options.map((option, i) => (
            <option key={i + 1} value={option}>{option}</option>
          ))
        }
      </select>
    </>
  );
};