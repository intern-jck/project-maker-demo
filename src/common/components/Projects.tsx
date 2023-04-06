import { useState, useEffect } from 'react';
import { GoFileMedia, GoDesktopDownload } from "react-icons/go";
import axios from 'axios';
import useSWR from 'swr';

import Folder from './Folder';

import type { CollectionType, ProjectType } from '@/common/types';
import styles from '@/styles/components/Projects.module.scss';
import { fetcher, getProjects, clickHandlerTest } from '@/common/modules/utils';

type Props = {
  currentCollection: CollectionType,
  selectProject: React.MouseEventHandler,
  // projects: ProjectType[],
};

export default function Projects({
  currentCollection,
  selectProject
  // projects,
}: Props) {

  console.log('Projects', currentCollection.name)

  // const { data, error } = useSWR<ProjectType[]>(`/api/projects`, fetcher);
  const [projects, setProjects] = useState<ProjectType[]>([]);

  useEffect(() => {
    getProjects(currentCollection._id)
      .then((projectsData) => {
        console.log(projectsData)
        setProjects(projectsData);
      })
      .catch(error => console.error(error));
  }, [currentCollection]);

  async function createProject(event: React.MouseEvent<HTMLButtonElement>) {
    const { name } = event.currentTarget;
    try {
      console.log('creating project in collection', currentCollection);
      const response = await axios.post('/api/projects', { name: 'default name', collection_id: currentCollection._id });
      const newProject = await response.data;
      console.log('created project', newProject);
      await updateProjects(currentCollection._id);
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  async function updateProjects(collectionId: string) {
    try {
      const _projects = await getProjects(currentCollection._id);
      // setProjects(_projects);
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return (
    <div className={styles.projects}>

      {/* Create/Download Projects */}
      <div className={styles.projectControls}>
        <h2>{currentCollection.name ? currentCollection.name : 'ALL'}</h2>
        <button
          name='create-project'
          onClick={createProject}>
          <GoFileMedia size={30} />
        </button>
        <button
          name='download-projects'
          onClick={clickHandlerTest}>
          <GoDesktopDownload size={30} />
        </button>
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
                  name={project.name}
                  clickHandler={selectProject}
                />
              )
            })
            : null
        }
      </div>

    </div>
  );
};
