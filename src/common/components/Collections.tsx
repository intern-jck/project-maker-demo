import { useState } from 'react';
import { CgAddR, CgTrash } from 'react-icons/cg';

import { TextInput } from '@/common/components/Inputs';
import styles from '@/styles/components/Collections.module.scss';

import type CollectionType from '@/common/types/CollectionType';

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

  const [newCollection, setNewCollection] = useState<string>('');

  function updateNewCollection(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;
    setNewCollection(value);
  }

  function createCollectionHandler(event: React.MouseEvent<HTMLButtonElement>) {
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
        <button name={'create_collection'} onClick={createCollectionHandler}>
          <CgAddR />
        </button>
      </div>
      <div className={styles.collectionSelect}>
        <select
          name={'select_collection'}
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
        <button name={'delete_collection'} onClick={deleteCollection}>
          <CgTrash />
        </button>
      </div>
    </div>
  );
};
