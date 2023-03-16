import React from 'react';
import Folder from './Folder.jsx';
import './Dashboard.scss';

const Dashboard = ({ projects, clickHandler }) => {
  return (
    <div id='Dashboard'>
      {
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
      }
    </div>
  );
};

export default Dashboard;
