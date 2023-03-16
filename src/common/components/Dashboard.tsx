import React from 'react';
import Folder from './Folder';
import styles from '@/styles/Dashboard.module.scss';

type Props = {
  projects: [],
  clickHandler: React.MouseEventHandler<HTMLButtonElement>
}

export default function Dashboard({ projects, clickHandler }: Props) {
  return (
    <div className={styles.Dashboard}>
      {/* {
        projects.map((project, i) => {
          return (
            <Folder
              key={project._id}
              clickHandler={clickHandler}
              id={project._id}
              name={project.name}
            />
          )
        })
      } */}
    </div>
  );
};
