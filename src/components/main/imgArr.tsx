import { ReactElement } from "react";
import { TbBrandDrupal, TbDiscount2, TbHeart, TbReportMoney } from 'react-icons/tb';

export const imgArr: { title: string; path: (type: string) => ReactElement<any, any> }[] = [
  {
    title: 'House for sale',
    path: (type: string) => <TbReportMoney className={type}/>
  },
  {
    title: 'House for rent',
    path: (type: string) => <TbDiscount2 className={type}/>
  },
  {
    title: 'Trending',
    path: (type: string) => <TbBrandDrupal className={type} />
  },
{
    title: 'Whislist',
    path: (type: string) => <TbHeart className={type} />
  }
];