import ProjectButton from './ProjectButton';

import type { FolderType, ProjectType } from '@/common/types';
import styles from '@/styles/components/Projects.module.scss';

type Props = {
  currentFolder: FolderType,
  projects: ProjectType[],
  selectProject: Function,
};

export default function Projects({
  currentFolder,
  projects,
  selectProject,
}: Props) {

  function selectProjectHandler(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const { value } = event.currentTarget;
    selectProject(value);
  };

  return (
    <div className={styles.projects}>
      {/* <h2>FOLDER: <span>{currentFolder.name ? currentFolder.name : 'ALL'}</span></h2> */}
        {
          projects.map((project, i) => {
            return (
              <ProjectButton
                key={project._id}
                id={project._id ? project._id : ''}
                name={project.name ? project.name : ''}
                clickHandler={selectProjectHandler}
              />
            )
          })
        }

    </div>
  );
};
