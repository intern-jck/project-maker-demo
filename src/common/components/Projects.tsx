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
  projects: ProjectType[],
  // createProject: Function,
};

export default function Projects({
  currentCollection,
  projects
}: Props) {

  console.log('Projects', currentCollection, projects)

  const { data, error } = useSWR<ProjectType[]>(`/api/projects`, fetcher);
  const [currentProject, setCurrentProject] = useState<ProjectType>();
  // const [projects, setProjects] = useState<ProjectType[]>([]);

  // useEffect(() => {
  //   // getProjects(currentCollection._id)
  //   //   .then((_projects) => {
  //   //     // console.log('projects', _projects)
  //   //     // setProjects(_projects);
  //   //   })
  //   //   .catch((error) => (console.error(error)));

  //   // if (data) {
  //   //   console.log('projects', data)
  //   //   // setProjects(data);
  //   // }
  // }, [currentCollection]);

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

  async function selectProject(event: React.MouseEvent<HTMLButtonElement>) {
    const { name } = event.currentTarget;
    console.log(name)
    try {
      const response = await axios.get(`api/projects/${name}`);
      const _project: ProjectType = await response.data;
      console.log('selected', _project)
      setCurrentProject(_project);
    } catch (error) {
      console.error(error);
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
        <h2>{currentCollection.name}</h2>
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
                  clickHandler={selectProject}
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
