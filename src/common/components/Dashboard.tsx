import React from 'react';
import Folder from './Folder';
import styles from '@/styles/Dashboard.module.scss';
import type ProjectType from '@/common/types/ProjectType';

type Props = {
  projects: ProjectType[],
  clickHandler: React.MouseEventHandler<HTMLButtonElement>
};

export default function Dashboard({ projects, clickHandler }: Props) {
  return (
    <div className={styles.Dashboard}>
      {
        projects?.map((project, i) => {
          return (
            <Folder
              key={project._id}
              id={project._id}
              clickHandler={clickHandler}
              name={project.name}
            />
          )
        })
      }
    </div>
  );
};
