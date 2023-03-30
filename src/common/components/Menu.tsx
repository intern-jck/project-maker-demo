import { TextInput } from '@/common/components/Inputs';
import Folder from '@/common/components/Folder';
import styles from '@/styles/components/Menu.module.scss';
import { CgAddR, CgCloseR } from 'react-icons/cg';
import CollectionType from '@/common/types/CollectionType';

type Props = {
  newCollection: string,
  collections: Array<CollectionType>,
  addCollectionHandler: React.MouseEventHandler,
  updateNewCollectionHandler: React.ChangeEventHandler,
  deleteCollectionHandler: React.MouseEventHandler,
  selectCollectionHandler: React.MouseEventHandler,
};

export default function Menu({
  newCollection,
  collections,
  addCollectionHandler,
  updateNewCollectionHandler,
  selectCollectionHandler,
  deleteCollectionHandler,
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
              <div
                className={styles.collection}
                key={collection._id}>
                <button
                  className={styles.deleteButton}
                  name={collection.name}
                  value={collection.name}
                  onClick={deleteCollectionHandler}
                  data-project-id={collection._id}
                >
                  <CgCloseR size={20} />
                </button>
                <Folder
                  id={collection._id}
                  name={collection.name}
                  clickHandler={selectCollectionHandler}
                />
              </div>
            ))
            : <></>
        }
      </div>
    </>
  );
};
