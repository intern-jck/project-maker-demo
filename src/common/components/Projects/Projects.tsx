import Project from './Project';
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

  console.log('Projects', currentFolder);

  function selectProjectHandler(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const { value } = event.currentTarget;
    selectProject(value);
  };

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
                clickHandler={selectProjectHandler}
              />
            )
          })
        }

    </div>
  );
};
