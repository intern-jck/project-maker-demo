import { useState } from 'react';
import { CgAddR, CgTrash } from 'react-icons/cg';
import { TextInput } from '@/common/components/Inputs';
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

  console.log('Collections')

  const [newCollection, setNewCollection] = useState<string>('');

  function setNewCollectionHandler(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    setNewCollection(value);
  };

  function createCollectionHandler(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    createCollection(newCollection);
    setNewCollection('')
  };

  function selectCollectionHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    const { value } = event.currentTarget;
    selectCollection(value);
  };

  function deleteCollectionHandler(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    deleteCollection(currentCollection._id);
  };

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
        <select
          name={'collections_select'}
          onChange={selectCollectionHandler}
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
          onClick={deleteCollectionHandler}
        >
          <CgTrash size={30} />
        </button>
      </div>

    </div>
  );
};
