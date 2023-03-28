import { TextInput } from '@/common/components/Inputs';
import styles from '@/styles/components/Menu.module.scss';
import { CgAddR } from 'react-icons/cg';
import CollectionType from '@/common/types/CollectionType';

type Props = {
  newCollection: string,
  collections: Array<CollectionType>,
  addCollectionHandler: React.MouseEventHandler,
  updateNewCollectionHandler: React.ChangeEventHandler,
  deleteHandler: React.MouseEventHandler,
  selectCollectionHandler: React.MouseEventHandler,
};

export default function Menu({
  newCollection,
  collections,
  addCollectionHandler,
  updateNewCollectionHandler,
  deleteHandler,
  selectCollectionHandler,
}: Props) {
  return (
    <>
      <div className={styles.collectionInput}>
        <TextInput
          name={'Add New Collection'}
          value={newCollection}
          changeHandler={updateNewCollectionHandler}
        />
        <button onClick={addCollectionHandler}>
          <CgAddR size={40} />
        </button>
      </div>
      <div className={styles.collectionList}>
        {
          collections.length > 0 ?
            collections.map((collection) => (
              <div key={collection._id} className={styles.collectionTag}>
                <button
                  onClick={selectCollectionHandler}
                  data-collection-id={collection._id}
                >
                  {collection.name}
                </button>
                <button
                  name={collection.name}
                  value={collection.name}
                  onClick={deleteHandler}
                  data-project-id={collection._id}
                >
                  <CgAddR size={20} />
                </button>
              </div>
            ))
            : <></>
        }
      </div>
    </>
  );
};
