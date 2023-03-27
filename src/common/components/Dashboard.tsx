import Folder from './Folder';
import { TextInput } from '@/common/components/Inputs';
import styles from '@/styles/components/Dashboard.module.scss';
import type ProjectType from '@/common/types/ProjectType';
import { CgAddR } from 'react-icons/cg';

type Props = {
  category: string,
  categories: string[],
  projects: ProjectType[],
  clickHandler: React.MouseEventHandler,
  addHandler: React.MouseEventHandler,
  changeHandler: React.ChangeEventHandler,
};

export default function Dashboard({ category, categories, projects, clickHandler, addHandler, changeHandler }: Props) {
  console.log(categories)
  return (
    <div className={styles.dashboard}>

      {/* Category Controls */}
      <div className={styles.dashControls}>
        <div className={styles.categoryInput}>
          <TextInput
            name={'Category'}
            value={category}
            changeHandler={changeHandler}
          />
          <button onClick={addHandler}>
            <CgAddR size={30} />
          </button>
        </div>

        {/* <select>
          <option value="grapefruit">Default</option>
          {
            categories ?
              categories.map((category, i) => {
                <option value={category.toLowerCase()}>{category}</option>
              })
              : null
          }
        </select> */}

      </div>

      {/* Project Folder List */}
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
