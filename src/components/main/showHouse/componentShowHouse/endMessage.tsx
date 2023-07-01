import { MdOutlineNearbyError } from 'react-icons/md';

const EndMessage = () => {
  return (
    <div className="w-full h-[400px]">
      <div className="m-auto flex">
        <MdOutlineNearbyError className="w-[50px] h-[50px] text-center" />
        <span className="m-auto ml-0 text-[24px]"> No results invalid </span>
      </div>
    </div>
  );
};

export default EndMessage;
