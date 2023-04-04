import { useState, useEffect } from 'react';
import { GoFileMedia, GoDesktopDownload } from "react-icons/go";
import Folder from './Folder';
import type { CollectionType, ProjectType } from '@/common/types';
import styles from '@/styles/components/ProjectList.module.scss';
import useSWR from 'swr';
import { fetcher } from '@/common/modules/utils';

import { getProjects } from '@/common/modules/utils';

function clickHandlerTest(event: React.MouseEvent<HTMLButtonElement>) {
  const { name, value } = event.currentTarget;
  console.log(name, value);
};

type Props = {
  currentCollection: CollectionType,
  createProject: Function,
  // projects: ProjectType[],
  // selectProjectHandler: React.MouseEventHandler
};

export default function ProjectList({ currentCollection, createProject, }: Props) {

  // console.log(currentCollection, projects)
  const [projects, setProjects] = useState<ProjectType[]>([]);

  function createProjectHandler(event: React.MouseEvent<HTMLButtonElement>) {
    createProject(currentCollection);
  };

  // const { data, error } = useSWR<CollectionType[]>(`/api/projects/collection`, fetcher);

  useEffect(() => {
    // if (data) {
    // console.log(currentCollection, data)
    getProjects(currentCollection._id)
      .then((projects) => {
        setProjects(projects)
      })
      .catch((error) => (console.error(error)))
    // }
  }, [currentCollection]);

  return (
    <div className={styles.projectList}>

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
      <div className={styles.projects}>
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
