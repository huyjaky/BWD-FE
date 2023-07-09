import { filterContext } from "@/contexts/filter";
import { Variants, motion } from "framer-motion";
import { Dispatch, SetStateAction, useContext } from "react";

interface PropertyItem {
  title: string;
  imgPath: string;

}

interface PropertyCreateHouseProps {
  typeHouseId: string[];
  setTypeHouseId: Dispatch<SetStateAction<string[]>>
}

const variantsPropertyItems: Variants = {
  isHover: {
    scale: 1.1
  }
};

const PropertyCreateHouse = ({ typeHouseId, setTypeHouseId }: PropertyCreateHouseProps) => {
  const arrPropertyItems: PropertyItem[] = [
    {
      title: 'House',
      imgPath: 'https://a0.muscache.com/pictures/4d7580e1-4ab2-4d26-a3d6-97f9555ba8f9.jpg'
    },
    {
      title: 'Apartment',
      imgPath: 'https://a0.muscache.com/pictures/21cfc7c9-5457-494d-9779-7b0c21d81a25.jpg'
    },
    {
      title: 'Guesthouse',
      imgPath: 'https://a0.muscache.com/pictures/6f261426-2e47-4c91-8b1a-7a847da2b21b.jpg'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-x-10 mobile:gap-y-5   grid-rows-1 mobile:grid-cols-1 mobile:grid-rows-3">
      {arrPropertyItems.map((item: PropertyItem, index: number) => {
        return (
          <div className="w-full h-full flex justify-center" key={index}>
            <motion.button
              className={`w-full h-[130px] border-2 rounded-2xl box-border p-2 mobile:w-full
              mobile:mb-5
                            ${typeHouseId.includes(item.title) ? 'border-black' : ''}
                          `}
              variants={variantsPropertyItems}
              whileTap={{ scale: 0.6 }}
              transition={{ duration: 0.5 }}
              onClick={(event) => {
                const arrTemp = typeHouseId;
                // if typeHouse have exist => remove it
                if (typeHouseId.includes(item.title)) {
                  const updateArrTemp: string[] = arrTemp.filter((item_: string) => {
                    return item_ !== item.title;
                  });
                  setTypeHouseId(updateArrTemp)
                  return;
                }
                arrTemp.push(item.title);
                setTypeHouseId(arrTemp);
                return;
              }}
              key={index}
            >
              <div className="w-full flex flex-col h-full">
                <div className="flex-1">
                  <img src={`${item.imgPath}`} alt="" />
                </div>
                <div className="flex-1 flex">
                  <span className="m-auto mb-2 ml-2">{item.title}</span>
                </div>
              </div>
            </motion.button>
          </div>
        );
      })}
    </div>
  );
}

export default PropertyCreateHouse