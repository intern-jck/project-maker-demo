import { GoFileMedia, GoDesktopDownload } from "react-icons/go";
import { TextInput } from '@/common/components/Inputs';
import styles from '@/styles/components/Menu.module.scss';
import { CgAddR } from 'react-icons/cg';

type Props = {
  category: string,
  categories: string[],
  addHandler: React.MouseEventHandler,
  changeHandler: React.ChangeEventHandler,
  createHandler: React.MouseEventHandler,
  downloadHandler: React.MouseEventHandler,
  deleteHandler: React.MouseEventHandler,
};

export default function Menu({
  category,
  categories,
  addHandler,
  changeHandler,
  createHandler,
  downloadHandler,
  deleteHandler,
}: Props) {
  console.log(categories)
  return (
    <>
      <div className={styles.controls}>
        {/* New Project Button */}
        <button onClick={createHandler} className='onclick'>
          <GoFileMedia size={30} />
        </button>
        {/* Download Project Data Button */}
        <button onClick={downloadHandler} className='onclick'>
          <GoDesktopDownload size={30} />
        </button>
      </div>

      {/* Category Controls */}
      <div className={styles.categories}>
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
          <option key='0' value='default'>CATEGORIES</option>
          {
            categories.map((category, i) => (
              <option key={i + 1} value={category.category}>{category.category}</option>
            ))
          }
        </select> */}
      </div>

      <div className={styles.categoryList}>
        {
          categories ?

            categories.map((category) => (
              <div key={category._id} className={styles.category}>
                {category.category}
                <button
                  name={category.category}
                  value={category.category}
                  onClick={deleteHandler}
                  data-project-id={category._id}
                >
                  <CgAddR size={20} />
                </button>
              </div>
            ))
            : <></>
        }
      </div>

    </>
  );
};
