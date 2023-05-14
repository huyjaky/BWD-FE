import { filterContext } from "@/contexts/filter";
import { Variants, motion } from "framer-motion";
import { useContext, useEffect } from "react";

interface PropertyItem {
  title: string;
  imgPath: string;
}

const variantsPropertyItems: Variants = {
  isHover: {
    scale: 1.1,
  }
};
const PropertyHouse = () => {
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
  const { filterForm, setFilterForm } = useContext(filterContext);
  useEffect(()=>{}, [filterForm])

  return (
    <div className="grid grid-cols-3 grid-rows-1">
      {arrPropertyItems.map((item: PropertyItem, index: number) => {
        return (
          <div className="w-full h-full flex justify-center">
            <motion.button
              className={`w-[150px] h-[130px] border-2 rounded-2xl box-border p-2
                            ${filterForm.typeHouse.includes(item.title) ? 'border-black' : ''}
                          `}
              variants={variantsPropertyItems}
              whileTap={{scale: 0.6}} transition={{duration: .5}}
              onClick={(event) => {
                const arrTemp = filterForm.typeHouse;
                // if typeHouse have exist => remove it
                if (filterForm.typeHouse.includes(item.title)) {
                  const updateArrTemp: string[] = arrTemp.filter((item_: string) => {
                    return item_ !== item.title;
                  });
                  setFilterForm({ ...filterForm, typeHouse: updateArrTemp });
                  return;
                }
                arrTemp.push(item.title);
                setFilterForm({ ...filterForm, typeHouse: arrTemp });
                return;
              }}
              key={index}>
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
};

export default PropertyHouse;
