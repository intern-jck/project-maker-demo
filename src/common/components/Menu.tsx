import { TextInput } from '@/common/components/Inputs';
import styles from '@/styles/components/Menu.module.scss';
import { CgAddR } from 'react-icons/cg';
import CollectionType from '@/common/types/CollectionType';

type Props = {
  collection: CollectionType,
  collections: Array<CollectionType>,
  addHandler: React.MouseEventHandler,
  changeHandler: React.ChangeEventHandler,
  deleteHandler: React.MouseEventHandler,
  updateHandler: React.MouseEventHandler,
};

export default function Menu({
  collection,
  collections,
  addHandler,
  changeHandler,
  deleteHandler,
  updateHandler,
}: Props) {
  console.log(collections)
  return (
    <>
      {/* Category Controls */}
      <div className={styles.collectionInput}>
        <TextInput
          name={'Add New Collection'}
          value={collection.name}
          changeHandler={changeHandler}
        />
        <button onClick={addHandler}>
          <CgAddR size={40} />
        </button>
      </div>

      <div className={styles.collectionList}>
        {
          collections.length > 0 ?
            collections.map((collection) => (
              <div key={collection._id} className={styles.collectionTag}>
                <button
                  onClick={updateHandler}
                  date-collection-id={collection._id}
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
