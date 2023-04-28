import TextInput from './TextInput';
import { CgAddR, CgCloseR } from 'react-icons/cg';
import type { RepoType } from '@/common/types';

type Props = {
  className: string,
  inputName: string,
  value: string,
  repos: RepoType[],
  changeHandler: React.ChangeEventHandler,
  addHandler: React.MouseEventHandler,
  deleteHandler: React.MouseEventHandler,
};

export default function RepoInput({ className, inputName, value, repos, changeHandler, addHandler, deleteHandler }: Props) {
  return (
    <div className={className}>

      <div className='repoName'>
        <TextInput
          inputName={inputName}
          value={value}
          changeHandler={changeHandler}
        />
        <button onClick={addHandler}>
          <CgAddR />
        </button>
      </div>

      <div className='repoList'>
        {
          repos ?
            repos.map((repo, i) => {
              return (
                <div key={i} className='repo'>
                  { repo.name }
                  <button onClick={deleteHandler} data-repo-index={i}>
                    <CgCloseR />
                  </button>
                </div>
              )
            })
            : <></>
        }
      </div>
    </div>
  );
};
