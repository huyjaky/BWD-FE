import { selectPopoverContext } from '@/contexts';
import { useContext, useEffect } from 'react';
import CheckIn_Out from './popOverDetail/checkIn_Out';
import Who from './popOverDetail/who';

const Popover = () => {
  const { selected, setSelected } = useContext(selectPopoverContext);

  return (
    <div
      className="absolute tablet:w-full w-[850px] h-[480px] top-24 pointer-events-none
        mobile:w-full tablet:h-full mobile:h-full tablet:top-0 mobile:top-0
      "
      id="root-popup"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="w-full h-full flex">
        {selected === 'who' && <Who styleWho={null} />}
        {selected === 'checkin' && (
          <CheckIn_Out
            styleHorizontal={'tablet:hidden mobile:hidden'}
            styleVerical={' laptop:hidden desktop:hidden'}
          />
        )}
        {selected === 'checkout' && (
          <CheckIn_Out
            styleHorizontal={'tablet:hidden mobile:hidden'}
            styleVerical={' laptop:hidden desktop:hidden'}
          />
        )}
      </div>
    </div>
  );
};

export default Popover;
