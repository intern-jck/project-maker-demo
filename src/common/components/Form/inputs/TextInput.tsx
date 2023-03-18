// type TextInputType = {
//   name: string,
//   value: string,
//   changeHandler: React.ChangeEventHandler,
// };

type Props = {
  name: string,
  value: string,
  changeHandler: React.ChangeEventHandler,
};

export default function TextInput({ name, value, changeHandler }: Props) {
  return (
    <>
      <label>
        {name}
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
