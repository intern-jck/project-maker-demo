type Props = {
  name: string,
  value: string,
  options: string[],
  changeHandler: React.ChangeEventHandler,
};

export default function Select({ name, value, options, changeHandler }: Props) {
  console.log(options)
  return (
    <div>
      <label htmlFor={name}>
        {name.toUpperCase()}
      </label>
      <select
        name={name}
        onChange={changeHandler}
        value={value}
      >
        <option key={0} value=''>{name}</option>
        {
          options.map((option, i) => (
            <option key={i + 1} value={option} >{option}</option>
          ))
        }
      </select>
    </div>
  );
};