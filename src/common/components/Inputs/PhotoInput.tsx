import TextInput from './TextInput';
import { CgAddR, CgCloseR } from 'react-icons/cg';
import Image from 'next/image';

type Props = {
  inputName: string,
  value: string,
  photos: string[],
  changeHandler: React.ChangeEventHandler,
  addHandler: React.MouseEventHandler,
  deleteHandler: React.MouseEventHandler,
}

export default function PhotoInput({ inputName, value, photos, changeHandler, addHandler, deleteHandler }: Props) {
  return (
    <div>

      <div className='photoURL'>
        <TextInput
          inputName={inputName}
          value={value}
          changeHandler={changeHandler}
        />
        <button onClick={addHandler}>
          <CgAddR />
        </button>
      </div>

      <div className='photoList'>
        {
          photos.map((photo, i) => {
            return (
              <div key={i} className='photoThumb'>
                <Image
                  src={photo}
                  alt='not found'
                  fill
                />
                <button onClick={deleteHandler} data-photo-index={i}>
                  <CgCloseR />
                </button>
              </div>
            )
          })
        }
      </div>

    </div>
  );
};
