import { useState, useEffect } from 'react';
import {Dashboard} from '@/common/components/Dashboard';
import {ProjectForm} from '@/common/components/ProjectForm';
import {Projects} from '@/common/components/Projects';

import {FolderType, ProjectType} from '@/common/types';
import {defaultFolder, defaultProject } from '@/common/defaults';

// import axios from 'axios';
// import useSWR from 'swr';
// import Projects from '@/common/components/Projects';
// import ProjectForm from '@/common/components/ProjectForm';
// import { fetcher, getProjects, getCollections } from '@/common/modules/utils';
// import { CollectionType, ProjectType } from '@/common/types';

const COLLECTION_LIMIT = 5;
const PROJECT_LIMIT = 20;

export default function Home({ }) {
  
  const [ currentFolder, setCurrentFolder ] = useState<FolderType>(defaultFolder);
  const [ folders, setFolders ] = useState<Array<FolderType>>([defaultFolder]);
  const [ currentProject, setCurrentProject ] = useState<ProjectType>(defaultProject);
  const [ projects, setProjects ] = useState<Array<ProjectType>>([defaultProject]);

  async function createProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('create project');
    // call to api
  };

  function selectProject(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const {name, value} = event.currentTarget;
    console.log('select project', name, value);
    setCurrentProject(value)
  };

  async function downloadProjects(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    console.log('download projects');
    // call to api
    // create blob and download all projects
  };


  return (
    <>

      <div className={'side-panel'}>
        <Dashboard
          currentFolder={currentFolder}
          folders={folders}
          createProject={createProject}
          downloadProjects={downloadProjects}
        />
        {
          projects.length ?
          <Projects
            currentFolder={currentFolder}
            projects={projects}
            selectProject={selectProject}
          />
          : <></>
        }
      </div>

      <div className={'project-panel'}>
        <ProjectForm />
      </div>

      {/* <div className='dashboard'> */}

        {/* <>
          {
            collections ?
              <Collections
                currentCollection={currentCollection}
                collections={collections}
                selectCollection={selectCollection}
                createCollection={createCollection}
                deleteCollection={deleteCollection}
              />
              : <></>
          }
        </> */}

        {/* <>
          {
            projects ?
              <Projects
                currentCollection={currentCollection}
                projects={projects}
                createProject={createProject}
                selectProject={selectProject}
                downloadProjects={downloadProjects}
              />
              : <></>
          }
        </> */}

      {/* </div> */}

      {/* <div className='project-form'> */}
        {/* {
          currentProject ?
            <ProjectForm
              id={currentProject._id}
              collections={collections}
              project={currentProject}
              saveProject={saveProject}
              deleteProject={deleteProject}
              closeProject={closeProject}
            />
            : <></>
        } */}
      {/* </div> */}

    </>
  )
};
