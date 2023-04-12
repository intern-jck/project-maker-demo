import { FolderType } from '@/common/types';

type Props = {
  inputName: string,
  value: string,
  options: FolderType[],
  changeHandler: React.ChangeEventHandler,
};

export default function Select({ 
  inputName, 
  value, 
  options, 
  changeHandler 
}: Props) {

  console.log('folder select', value, options)

  function changeTest(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.currentTarget;
    console.log('select change test', name, value)
  }

  return (
    <>
      <label htmlFor={inputName}>
        {inputName ? inputName.toUpperCase() : ''}
      </label>
      <select
        name={inputName}
        onChange={changeHandler}
        value={value}
      >
        <option key={0} value=''>{inputName}</option>
        {
          options.map((option, i) => (
            <option key={i + 1} value={option._id} >{option.name}</option>
          ))
        }
      </select>
    </>
  );
};