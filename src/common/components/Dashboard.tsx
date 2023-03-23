import React from 'react';
import Folder from './Folder';
import styles from '@/styles/components/Dashboard.module.scss';
import type ProjectType from '@/common/types/ProjectType';

type Props = {
  projects: ProjectType[],
  clickHandler: React.MouseEventHandler<HTMLButtonElement>
};

export default function Dashboard({ projects, clickHandler }: Props) {
  // console.log(projects)
  return (
    <div className={styles.dashboard}>
      {
        projects ?
          projects.map((project, i) => {
            return (
              <Folder
                key={project._id}
                id={project._id}
                clickHandler={clickHandler}
                name={project.name}
              />
            )
          })
          : null
      }
    </div>
  );
};
