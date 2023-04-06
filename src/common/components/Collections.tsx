import { useState, useEffect } from 'react';
import { CgAddR, CgTrash } from 'react-icons/cg';

import { TextInput } from '@/common/components/Inputs';
import styles from '@/styles/components/Collections.module.scss';

import type CollectionType from '@/common/types/CollectionType';
import { changeHandlerTest, clickHandlerTest } from '@/common/modules/utils';


type Props = {
  currentCollection: CollectionType,
  collections: CollectionType[],
  createCollection: Function,
  selectCollection: React.ChangeEventHandler,
  deleteCollection: React.MouseEventHandler,
};

export default function Collections({
  currentCollection,
  collections,
  createCollection,
  selectCollection,
  deleteCollection,
}: Props) {

  // console.log('Collections', currentCollection, collections)

  const [newCollection, setNewCollection] = useState<string>('');

  function updateNewCollection(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { value } = event.currentTarget;
    setNewCollection(value);
  }

  function createCollectionHandler(event: React.MouseEvent<HTMLButtonElement>) {
    console.log('creating', newCollection);
    if (newCollection) {
      createCollection(newCollection);
      setNewCollection('');
    }
  }

  return (

    <div className={styles.collections}>

      <div className={styles.collectionInput}>
        <TextInput
          name={'new_collection'}
          value={newCollection}
          changeHandler={updateNewCollection}
        />
        <button
          name={'add'}
          onClick={createCollectionHandler}>
          <CgAddR size={30} />
        </button>
      </div>

      <div className={styles.collectionSelect}>
        <select
          name={'collections_select'}
          onChange={selectCollection}
          value={currentCollection._id}
        >
          <option key={0} value=''>collections</option>
          {
            collections.map((collection, i) => (
              <option key={i + 1} value={collection._id} >{collection.name}</option>
            ))
          }
        </select>
        <button
          name={'delete'}
          onClick={deleteCollection}
        >
          <CgTrash size={30} />
        </button>
      </div>

    </div>
  );
};
