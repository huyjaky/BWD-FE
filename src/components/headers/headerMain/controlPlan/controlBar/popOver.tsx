import { selectPopoverContext } from '@/contexts';
import { useContext } from 'react';
import CheckIn from './popOverDetail/checkIn';
import CheckOut from './popOverDetail/checkOut';
import Where from './popOverDetail/where';
import Who from './popOverDetail/who';

const Popover = () => {
  const { selected, setSelected } = useContext(selectPopoverContext);

  return (
    <div className="absolute w-[850px] h-[480px] top-24 pointer-events-none" id="root-popup"
    onClick={event =>  event.stopPropagation()}
    >
      <div className="w-full h-full flex">
        {selected === 'where' && <Where />}
        {selected === 'checkin' && <CheckIn />}
        {selected === 'checkout' && <CheckOut />}
        {selected === 'who' && <Who />}
      </div>
    </div>
  );
};

export default Popover;
