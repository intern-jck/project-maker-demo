// type TextInputType = {
//   name: string,
//   value: string,
//   changeHandler: React.ChangeEventHandler,
// };

// import styles from '@/styles/Inputs/TextInput.module.scss';
// import styles from '@/styles/Inputs/Inputs.module.scss';

type Props = {
  name: string,
  value: string,
  changeHandler: React.ChangeEventHandler,
};

export default function TextInput({ name, value, changeHandler }: Props) {
  return (
    <>
      <label className={'textInput'}>
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
