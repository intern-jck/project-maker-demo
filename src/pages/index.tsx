import { useState, useEffect } from 'react';
import {Dashboard} from '@/common/components/Dashboard';
import {ProjectForm} from '@/common/components/ProjectForm';

// import axios from 'axios';
// import useSWR from 'swr';
// import Projects from '@/common/components/Projects';
// import ProjectForm from '@/common/components/ProjectForm';
// import { fetcher, getProjects, getCollections } from '@/common/modules/utils';
// import { CollectionType, ProjectType } from '@/common/types';

const COLLECTION_LIMIT = 5;
const PROJECT_LIMIT = 20;

export default function Home({ }) {

  // const { data, error } = useSWR<CollectionType[]>('/api/collections', fetcher);
  // const [currentCollection, setCurrentCollection] = useState<CollectionType>(defaultCollection);
  // const [collections, setCollections] = useState<CollectionType[]>([]);
  // const [currentProject, setCurrentProject] = useState<ProjectType>();
  // const [projects, setProjects] = useState<ProjectType[]>([]);
  // useEffect(() => {
  //   if (data) {
  //     setCollections(data);
  //     getProjects('')
  //       .then((projectsData) => {
  //         setProjects(projectsData);
  //       })
  //       .catch(error => console.error(error));
  //   }
  // }, [data]);

  return (
    <>
      <Dashboard />
      <ProjectForm />
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
