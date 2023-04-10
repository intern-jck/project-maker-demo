import Project from './Project';
import type { FolderType, ProjectType } from '@/common/types';
import styles from '@/styles/components/Projects.module.scss';

type Props = {
  currentFolder: FolderType,
  projects: ProjectType[],
  selectProject: React.MouseEventHandler,
};

export default function Projects({
  currentFolder,
  projects,
  selectProject,
}: Props) {

  console.log('Projects', currentFolder);

  return (
    <div className={styles.projects}>
      Projects
      {currentFolder.name}
        {
          projects.map((project, i) => {
            return (
              <Project
                key={project._id}
                id={project._id ? project._id : ''}
                name={project.name ? project.name : ''}
                clickHandler={selectProject}
              />
            )
          })
        }

    </div>
  );
};
