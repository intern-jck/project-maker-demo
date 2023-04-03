import { CgAddR, CgTrash } from 'react-icons/cg';

import { TextInput, SelectInput } from '@/common/components/Inputs';
import type CollectionType from '@/common/types/CollectionType';
import styles from '@/styles/components/Dashboard.module.scss';

type Props = {
  newCollection: string,
  collectionNames: string[],
  currentCollection: CollectionType,
  createCollectionHandler: React.MouseEventHandler,
  updateNewCollectionHandler: React.ChangeEventHandler,
  updateCurrentCollectionHandler: React.ChangeEventHandler
  deleteCollectionHandler: React.MouseEventHandler,
  // projects: ProjectType[],
  // createProjectHandler: React.MouseEventHandler,
  // downloadHandler: React.MouseEventHandler,
  // onChangeHandler: React.ChangeEventHandler,
};

function changeHandlerTest(event: React.ChangeEvent<HTMLSelectElement>) {
  const { name, value } = event.currentTarget;
  console.log(name, value);
}

function clickHandlerTest(event: React.MouseEvent<HTMLButtonElement>) {
  const { name, value } = event.currentTarget;
  console.log(name, value);
}

export default function Dashboard({
  newCollection,
  collectionNames,
  currentCollection,
  createCollectionHandler,
  updateNewCollectionHandler,
  updateCurrentCollectionHandler,
  deleteCollectionHandler,
  // projects,
  // clickHandler,
  // downloadHandler,
}: Props) {
  return (
    <div className={styles.dashboard}>

      {/* Create/Delete Collections */}
      <div className={styles.collections}>
        <div className={styles.collectionInput}>
          <TextInput
            name={'new_collection'}
            value={newCollection}
            changeHandler={updateNewCollectionHandler}
          />
          <button
            name={'add'}
            onClick={createCollectionHandler}>
            <CgAddR size={30} />
          </button>
        </div>
        <div className={styles.collectionSelect}>
          <SelectInput
            name={'collections'}
            value={currentCollection.name}
            options={collectionNames}
            changeHandler={updateCurrentCollectionHandler}
          />
          <button
            name={'delete'}
            onClick={deleteCollectionHandler}>
            <CgTrash size={30} />
          </button>
        </div>

      </div>

      {/* Create/Download Projects */}
      {/* <div className={styles.projectControls}>
        <h2>{currentCollection.name}COLLECTION NAME</h2>
        <h2>{currentCollection.name}</h2>
        <button
          name={'create'}
          onClick={clickHandlerTest}>
          <GoFileMedia size={30} />
        </button>
        <button
          name={'download'}
          onClick={clickHandlerTest}>
          <GoDesktopDownload size={30} />
        </button>
      </div> */}

      {/* Project Folder List */}
      {/* <div className={styles.projects}>
        {
          projects ?
            projects.map((project, i) => {
              return (
                <Folder
                  key={project._id}
                  id={project._id}
                  clickHandler={clickHandler}
                  name={project.name}
                />
              )
            })
            : null
        }
      </div> */}
    </div>
  );
};
