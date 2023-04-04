import { useState, useEffect } from 'react';
import { GoFileMedia, GoDesktopDownload } from "react-icons/go";
import Folder from './Folder';

import type { CollectionType, ProjectType } from '@/common/types';
import styles from '@/styles/components/Projects.module.scss';
import { getProjects } from '@/common/modules/utils';

type Props = {
  currentCollection: CollectionType,
  createProject: Function,
};


// // PROJECTS FUNCTIONS
// async function createProject(collection: CollectionType) {
//   try {

//     console.log('creating project in collection', currentCollection);
//     const response = await axios.post('/api/projects', { name: 'default name', collection_id: collection._id });
//     const newProject = await response.data;
//     console.log('created project', newProject);
//     return true;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

export default function Projects({ currentCollection }: Props) {

  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [currentProject, setCurrentProject] = useState<ProjectType>();


  useEffect(() => {
    getProjects(currentCollection._id)
      .then((projects) => {
        setProjects(projects)
      })
      .catch((error) => (console.error(error)))
  }, [currentCollection]);

  function createProjectHandler(event: React.MouseEvent<HTMLButtonElement>) {
    createProject(currentCollection);
  };

  return (
    <div className={styles.projects}>

      {/* Create/Download Projects */}
      <div className={styles.projectControls}>
        <h2>{currentCollection.name}</h2>
        <button
          onClick={createProjectHandler}>
          <GoFileMedia size={30} />
        </button>
        {/* <button
          name={'download'}
          onClick={clickHandlerTest}>
          <GoDesktopDownload size={30} />
        </button> */}
      </div>

      {/* Project Folder List */}
      <div className={styles.projectsList}>
        {
          projects.length > 0 ?
            projects.map((project, i) => {
              return (
                <Folder
                  key={project._id}
                  id={project._id}
                  // clickHandler={selectProjectHandler}
                  name={project.name}
                />
              )
            })
            : null
        }
      </div>

    </div>
  );
};
