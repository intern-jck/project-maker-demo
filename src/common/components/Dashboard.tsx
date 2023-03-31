import Folder from './Folder';
import { GoFileMedia, GoDesktopDownload } from "react-icons/go";
import { CgAddR, CgCloseR, CgTrash } from 'react-icons/cg';

import styles from '@/styles/components/Dashboard.module.scss';
import { TextInput, SelectInput } from '@/common/components/Inputs';
import type ProjectType from '@/common/types/ProjectType';
import type CollectionType from '@/common/types/CollectionType';

type Props = {
  currentCollection: CollectionType,
  projects: ProjectType[],
  clickHandler: React.MouseEventHandler,
  createHandler: React.MouseEventHandler,
  downloadHandler: React.MouseEventHandler,
};


function changeHandlerTest(event: React.ChangeEvent<HTMLSelectElement>) {
  const { name, value } = event.currentTarget;
  console.log(name, value);
}

export default function Dashboard({
  currentCollection,
  projects,
  clickHandler,
  createHandler,
  downloadHandler,
}: Props) {
  return (
    <div className={styles.dashboard}>

      {/* Create/Delete Collections */}
      <div className={styles.collections}>

        <div className={styles.collectionInput}>
          <TextInput
            name={'New Collection'}
            value={'test'}
            changeHandler={changeHandlerTest}
          />
          <button onClick={changeHandlerTest}>
            <CgAddR size={30} />
          </button>
        </div>

        <div className={styles.collectionSelect}>
          <SelectInput
            name={'COLLECTIONS'}
            value={'default'}
            options={[]}
            changeHandler={changeHandlerTest}
          />
          <button onClick={() => (console.log('delete'))}>
            <CgTrash size={30} />
          </button>
        </div>

      </div>

      {/* Create/Download Projects */}
      <div className={styles.projectControls}>
        <h2>{currentCollection.name}COLLECTION NAME</h2>
        <button onClick={createHandler}>
          <GoFileMedia size={30} />
        </button>
        <button onClick={downloadHandler}>
          <GoDesktopDownload size={30} />
        </button>
      </div>

      {/* Project Folder List */}
      <div className={styles.projects}>
        {/* {
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
        } */}
      </div>
    </div>
  );
};
