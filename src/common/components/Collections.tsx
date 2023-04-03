import { useState, useCallback } from 'react';
import { CgAddR, CgTrash } from 'react-icons/cg';

import { TextInput, SelectInput } from '@/common/components/Inputs';
import type CollectionType from '@/common/types/CollectionType';
import styles from '@/styles/components/Dashboard.module.scss';

type Props = {
  newCollection: string,
  collectionNames: string[],
  currentCollection: CollectionType,

  createCollectionHandler: Function,

  updateNewCollectionHandler: React.ChangeEventHandler,
  // updateCurrentCollectionHandler: React.ChangeEventHandler
  deleteCollectionHandler: React.MouseEventHandler,
};

// function changeHandlerTest(event: React.ChangeEvent<HTMLSelectElement>) {
//   const { name, value } = event.currentTarget;
//   console.log(name, value);
// }
// function clickHandlerTest(event: React.MouseEvent<HTMLButtonElement>) {
//   const { name, value } = event.currentTarget;
//   console.log(name, value);
// }

export default function Collections({
  // newCollection,
  collectionNames,
  currentCollection,
  createCollectionHandler,
  updateNewCollectionHandler,
  // updateCurrentCollectionHandler,
  deleteCollectionHandler,
}: Props) {

  console.log('collections', collectionNames)

  const [newCollection, setNewCollection] = useState<string>('');

  // function setNewCollectionHandler(event: React.ChangeEvent<HTMLInputElement>) {
  //   // event.preventDefault();
  //   const { name, value } = event.currentTarget;
  //   console.log('new col', value)
  //   setNewCollection(value);
  // }

  function setNewCollectionHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    setNewCollection(value);
  };

  const updateNewCollection = useCallback(newCollection) => {
    // const { name, value } = event.currentTarget;
    setNewCollection(newCollection);
  }, [newCollection]);

  function createNewCollection(event: React.MouseEvent<HTMLButtonElement>) {
    if (newCollection) {
      createCollectionHandler(newCollection);
    }
  }


  return (
    <div className={styles.dashboard}>

      <div className={styles.collections}>

        <div className={styles.collectionInput}>
          <TextInput
            name={'new_collection'}
            value={newCollection}
            changeHandler={setNewCollectionHandler}
          />
          <button
            name={'add'}
            onClick={createNewCollection}>
            <CgAddR size={30} />
          </button>
        </div>

        <div className={styles.collectionSelect}>
          <SelectInput
            name={'collections'}
            value={currentCollection.name}
            options={collectionNames}
          // changeHandler={updateCurrentCollectionHandler}
          />
          <button
            name={'delete'}
            onClick={deleteCollectionHandler}>
            <CgTrash size={30} />
          </button>
        </div>

      </div>

    </div>
  );
};
