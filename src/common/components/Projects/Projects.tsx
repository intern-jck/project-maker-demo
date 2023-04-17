import ProjectButton from './ProjectButton';

import type { FolderType, ProjectType } from '@/common/types';
import styles from '@/styles/components/Projects.module.scss';

type Props = {
  projects: ProjectType[],
  selectProject: Function,
};

export default function Projects({
  projects,
  selectProject,
}: Props) {

  console.log('projects', projects)

  function selectProjectHandler(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const { value } = event.currentTarget;
    selectProject(value);
  };

  return (
    <div className={styles.projects}>
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
