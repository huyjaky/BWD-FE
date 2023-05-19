import { selectPopoverContext } from '@/contexts';
import { selectPlaceContext } from '@/contexts/selectPlace';
import { useContext, useEffect } from 'react';

const Who = () => {
  const { selected } = useContext(selectPopoverContext);
  const { address, setAddress } = useContext(selectPlaceContext);

  const guestArr: { title: string; des: string; amount: number }[] = [
    {
      title: 'Adults',
      des: 'Ages 13 or above',
      amount: address.guest.adults
    },
    {
      title: 'Childrens',
      des: 'Ages 2-12',
      amount: address.guest.childrens
    },
    {
      title: 'Infants',
      des: 'Under 2',
      amount: address.guest.infants
    }
  ];
  useEffect(() => {}, [selected]);

  const plusGuest = (event: any) => {
    const componentId = event.target.id;
    if (componentId === 'Adults') {
      setAddress({ ...address, guest: { ...address.guest, adults: address.guest.adults + 1 } });
    } else if (componentId === 'Childrens') {
      setAddress({
        ...address,
        guest: { ...address.guest, childrens: address.guest.childrens + 1 }
      });
    } else if (componentId === 'Infants') {
      setAddress({ ...address, guest: { ...address.guest, infants: address.guest.infants + 1 } });
    }
  };

  const minusGuest = (event: any) => {
    const componentId = event.target.id;
    if (componentId === 'Adults') {
      if (address.guest.adults == 0) return;
      setAddress({ ...address, guest: { ...address.guest, adults: address.guest.adults - 1 } });
    } else if (componentId === 'Childrens') {
      if (address.guest.childrens == 0) return;
      setAddress({
        ...address,
        guest: { ...address.guest, childrens: address.guest.childrens - 1 }
      });
    } else if (componentId === 'Infants') {
      if (address.guest.infants == 0) return;
      setAddress({ ...address, guest: { ...address.guest, infants: address.guest.infants - 1 } });
    }
  };
  return (
    <div className="w-full h-full flex justify-end mobile:justify-center tablet:justify-center">
      <div
        className="w-[350px] h-full bg-white rounded-2xl pointer-events-auto box-border
        p-6 mobile:w-full tablet:w-full
      "
        id="who-popup"
      >
        <div className="grid grid-cols-1 grid-rows-3 w-full h-full">
          {guestArr.map((item, index) => {
            return (
              <div
                className={`w-full ${index == guestArr.length - 1 ? '' : 'border-b-2'} flex `}
                key={index}
              >
                {/* title and des */}
                <div className="flex-1 h-full flex flex-col tablet:text-center mobile:text-center">
                  <span className="w-full m-auto mb-0 font-bold">{item.title}</span>
                  <span className="w-full m-auto mt-0">{item.des}</span>
                </div>

                {/* button */}
                <div className="flex-1 h-full">
                  <div className="w-full h-full flex">
                    <div className="w-fit h-fit flex m-auto">
                      <button
                        className={`w-[35px] h-[35px] border-2 rounded-full font-bold
                        ${item.amount == 0 ? '' : 'border-slate-800'}
                      `}
                        id={`${item.title}`}
                        onClick={minusGuest}
                      >
                        &#45;
                      </button>
                      <span className="w-[35px] h-[35px] text-[23px] text-center">
                        {item.amount}
                      </span>
                      <button
                        className="w-[35px] h-[35px] border-2 rounded-full
                      border-slate-800 font-bold
                      "
                        id={`${item.title}`}
                        onClick={plusGuest}
                      >
                        &#43;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Who;
