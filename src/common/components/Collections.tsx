import { useState, useCallback } from 'react';
import { CgAddR, CgTrash } from 'react-icons/cg';

import { TextInput, SelectInput } from '@/common/components/Inputs';
import type CollectionType from '@/common/types/CollectionType';
import styles from '@/styles/components/Collections.module.scss';

type Props = {
  currentCollection: CollectionType,
  collections: CollectionType[],
  createCollection: Function,
  selectCollection: Function,
  deleteCollection: Function,
};

export default function Collections({
  currentCollection,
  collections,
  createCollection,
  selectCollection,
  deleteCollection,
}: Props) {

  console.log('collections', collections, currentCollection.name);

  const [newCollection, setNewCollection] = useState<string>('');

  function setNewCollectionHandler(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    console.log('new col', value)
    setNewCollection(value);
  };

  function createCollectionHandler(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    console.log('create handler', newCollection)
    createCollection(newCollection);
    setNewCollection('')
  };

  function selectCollectionHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    const { value } = event.currentTarget;
    console.log('select handler', value)
    selectCollection(value);
  };

  function deleteCollectionHandler(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    console.log('delete handler', name, currentCollection);
    // deleteCollection(currentCollection._id);
  }

  return (

    <div className={styles.collections}>

      <div className={styles.collectionInput}>
        <TextInput
          name={'new_collection'}
          value={newCollection}
          changeHandler={setNewCollectionHandler}
        />
        <button
          name={'add'}
          onClick={createCollectionHandler}>
          <CgAddR size={30} />
        </button>
      </div>

      <div className={styles.collectionSelect}>
        {/* <SelectInput
          name={'collections'}
          value={currentCollection.name}
          options={collections.map((c) => (c.name))}
        // changeHandler={updateCurrentCollectionHandler}
        /> */}
        <select
          name={'collections_select'}
          onChange={selectCollectionHandler}
          value={currentCollection._id}
        >
          <option key={0} value='ALL'>collections</option>
          {
            collections.map((collection, i) => (
              <option key={i + 1} value={collection._id} >{collection.name}</option>
            ))
          }
        </select>
        <button
          name={'delete'}
          onClick={deleteCollectionHandler}
        >
          <CgTrash size={30} />
        </button>
      </div>

    </div>
  );
};
