import Folder from './Folder';
import styles from '@/styles/components/Dashboard.module.scss';
import type ProjectType from '@/common/types/ProjectType';

type Props = {
  category: string,
  projects: ProjectType[],
  clickHandler: React.MouseEventHandler,
};

export default function Dashboard({ category, projects, clickHandler }: Props) {
  return (
    <div className={styles.dashboard}>
      {/* Project Folder List */}
      {
        category && projects ?
          projects.map((project, i) => {
            if (project.category === category) {
              return (
                <Folder
                  key={project._id}
                  id={project._id}
                  clickHandler={clickHandler}
                  name={project.name}
                />
              )
            }
          })
          : null
      }
    </div>
  );
};
