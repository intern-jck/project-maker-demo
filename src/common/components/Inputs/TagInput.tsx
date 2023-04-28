import TextInput from './TextInput';
import { CgAddR, CgCloseR } from 'react-icons/cg';
import type { TechType } from '@/common/types';

type Props = {
  className: string,
  inputName: string,
  value: string,
  tags: TechType[],
  changeHandler: React.ChangeEventHandler,
  addHandler: React.MouseEventHandler,
  deleteHandler: React.MouseEventHandler,
};

export default function TagInput({ className, inputName, value, tags, changeHandler, addHandler, deleteHandler }: Props) {
  return (
    <div className={className}>

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
                  { tag.name }
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
