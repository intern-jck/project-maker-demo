import ProjectButton from './ProjectButton';
import type { ProjectType } from '@/common/types';
import styles from '@/styles/components/Projects.module.scss';

type Props = {
  projects: ProjectType[],
  selectProject: Function,
};

export default function ProjectList({
  projects,
  selectProject,
}: Props) {

  function selectProjectHandler(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const { value } = event.currentTarget;
    selectProject(value);
  };

  return (
    <div className={styles.projectList}>
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
