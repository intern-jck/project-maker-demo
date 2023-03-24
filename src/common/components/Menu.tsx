import { GoFileMedia, GoDesktopDownload } from "react-icons/go";

type Props = {
  createHandler: React.MouseEventHandler<HTMLButtonElement>,
  downloadHandler: React.MouseEventHandler<HTMLButtonElement>
};

export default function Menu({ createHandler, downloadHandler }: Props) {

  return (
    <div className={'menu'}>
      {/* New Project Button */}
      <button onClick={createHandler} className='onclick'>
        <GoFileMedia size={30} />
      </button>
      {/* Download Project Data Button */}
      <button onClick={downloadHandler} className='onclick'>
        <GoDesktopDownload size={30} />
      </button>
    </div>
  );
};
