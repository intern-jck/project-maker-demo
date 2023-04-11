import TextInput from './TextInput';
import { CgAddR, CgCloseR } from 'react-icons/cg';

type Props = {
  inputName: string,
  value: string,
  tags: string[],
  changeHandler: React.ChangeEventHandler,
  addHandler: React.MouseEventHandler,
  deleteHandler: React.MouseEventHandler,
};

export default function TagInput({ inputName, value, tags, changeHandler, addHandler, deleteHandler }: Props) {
  return (
    <div>

      <div className='tagName'>
        <TextInput
          inputName={inputName}
          value={value}
          changeHandler={changeHandler}
        />
        <button onClick={addHandler}>
          <CgAddR />
        </button>
      </div>

      <div className='tagList'>
        {
          tags ?
            tags.map((tag, i) => {
              return (
                <div key={i} className='tag'>
                  {tag}
                  <button onClick={deleteHandler} data-tag-index={i}>
                    <CgCloseR />
                  </button>
                </div>
              )
            })
            : <></>
        }
      </div>
    </div>
  );
};
