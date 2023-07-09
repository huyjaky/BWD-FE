import { ReactElement } from 'react';
import { BiSolidBuildingHouse } from 'react-icons/bi';
import { BsBookmarkHeartFill, BsFillHouseCheckFill } from 'react-icons/bs';
import { WiStars } from 'react-icons/wi';
export const imgArr: { title: string; path: (type: string) => ReactElement<any, any> }[] = [
  {
    title: 'House for sale',
    path: (type: string) => <BsFillHouseCheckFill className={type + 'text-[2rem]'} />
  },
  {
    title: 'House for rent',
    path: (type: string) => <BiSolidBuildingHouse className={type + 'text-[2rem]'} />
  },
  {
    title: 'Whislist',
    path: (type: string) => <BsBookmarkHeartFill className={type + 'text-[2rem]'} />
  }
];
