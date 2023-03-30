import TextInput from './TextInput';
import { CgAddR, CgCloseR } from 'react-icons/cg';

type Props = {
  name: string,
  value: string,
  tags: string[],
  changeHandler: React.ChangeEventHandler,
  addHandler: React.MouseEventHandler,
  deleteHandler: React.MouseEventHandler,
};

export default function TagInput({ name, value, tags, changeHandler, addHandler, deleteHandler }: Props) {
  return (
    <div className='tagInput'>

      <div className='tagName'>
        <TextInput
          name={name}
          value={value}
          changeHandler={changeHandler}
        />
        <button onClick={addHandler}>
          <CgAddR size={30} />
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
