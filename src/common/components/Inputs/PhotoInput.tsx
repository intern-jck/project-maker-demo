import TextInput from './TextInput';
import { CgAddR, CgCloseR } from 'react-icons/cg';
import Image from 'next/image';

type Props = {
  name: string,
  value: string,
  photos: Array<string>,
  changeHandler: React.ChangeEventHandler,
  addHandler: React.MouseEventHandler,
  deleteHandler: React.MouseEventHandler,
}

export default function PhotoInput({ name, value, photos, changeHandler, addHandler, deleteHandler }: Props) {
  return (
    <div className='photoInput'>
      <div className='photoUrlInput'>
        <TextInput
          name={name}
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
