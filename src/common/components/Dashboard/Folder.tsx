import { CgFolder } from 'react-icons/cg';

type Props = {
  id: string,
  name: string,
  clickHandler: React.MouseEventHandler
};

export default function Folder({ id, name, clickHandler }: Props) {
  return (
    <>
      <button
        name={id}
        value={id}
        onClick={clickHandler}
      >
        <CgFolder />
        <span>{name}</span>
      </button>
    </>
  );
};
