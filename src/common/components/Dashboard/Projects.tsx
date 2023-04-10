// import { GoFileMedia, GoDesktopDownload } from "react-icons/go";
import Project from './Project';
import type { ProjectType } from '@/common/types';
// import { clickHandlerTest } from '@/common/modules/utils';
import styles from '@/styles/components/Projects.module.scss';

type Props = {
//   currentCollection: CollectionType,
  projects: ProjectType[],
//   selectProject: React.MouseEventHandler,
//   createProject: React.MouseEventHandler,
//   downloadProjects: React.MouseEventHandler,
};

// {
//   // currentCollection,
//   // projects,
//   // selectProject,
//   // createProject,
//   // downloadProjects
// }: Props

export default function Projects({
  projects
}: Props) {

  return (
    <div className={styles.projects}>

      {/* Create/Download Projects */}
      {/* <div className={styles.projectControls}>
        <h2>{currentCollection.name ? currentCollection.name : 'ALL'}</h2>
        <button name='create-project' onClick={createProject}>
          <GoFileMedia />
        </button>
        <button name='download-projects' onClick={downloadProjects}>
          <GoDesktopDownload />
        </button>
      </div> */}

      {/* Project Folder List */}
      {/* <div className={styles.projectsList}> */}
        {
          projects.map((project, i) => {
            return (
              <Project
                key={project._id}
                id={project._id ? project._id : ''}
                name={project.name ? project.name : ''}
                // clickHandler={selectProject}
              />
            )
          })
        }
      {/* </div> */}

    </div>
  );
};
