// import { GoFileMedia, GoDesktopDownload } from "react-icons/go";
// import Folder from './Folder';
// import type { CollectionType, ProjectType } from '@/common/types';
// import { clickHandlerTest } from '@/common/modules/utils';
import styles from '@/styles/components/Projects.module.scss';

// type Props = {
//   currentCollection: CollectionType,
//   projects: ProjectType[],
//   selectProject: React.MouseEventHandler,
//   createProject: React.MouseEventHandler,
//   downloadProjects: React.MouseEventHandler,
// };
// {
//   // currentCollection,
//   // projects,
//   // selectProject,
//   // createProject,
//   // downloadProjects
// }: Props

export default function Projects() {

  return (
    <div className={styles.projects}>
      <h3>PROJECTS</h3>

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
      {/* <div className={styles.projectsList}>
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
      </div> */}

    </div>
  );
};
