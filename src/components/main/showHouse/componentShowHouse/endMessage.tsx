import { MdOutlineNearbyError } from 'react-icons/md';

const EndMessage = () => {
  return (
    <div className="w-full h-[1.5rem]">
      <div className="m-auto flex">
        <MdOutlineNearbyError className="w-[3rem] h-[3rem] text-center" />
        <span className="m-auto ml-0 text-[2rem]"> No results invalid </span>
      </div>
    </div>
  );
};

export default EndMessage;
