import { TextInput } from '@/common/components/Inputs';
import styles from '@/styles/components/Menu.module.scss';
import { CgAddR } from 'react-icons/cg';

type Props = {
  category: string,
  categories: string[],
  addHandler: React.MouseEventHandler,
  changeHandler: React.ChangeEventHandler,
  deleteHandler: React.MouseEventHandler,
};

export default function Menu({
  category,
  categories,
  addHandler,
  changeHandler,
  deleteHandler,
}: Props) {
  console.log(categories)
  return (
    <>
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
