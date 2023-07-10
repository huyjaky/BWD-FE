import { filterContext } from "@/contexts/filter";
import { Variants, motion } from "framer-motion";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface PropertyItem {
  id: string;
  title: string;
  imgPath: string;

}

interface PropertyCreateHouseProps {
  typeHouseId: string[];
  setTypeHouseId: (payload: string[]) => void
}

const variantsPropertyItems: Variants = {
  isHover: {
    scale: 1.1
  }
};

const PropertyCreateHouse = ({typeHouseId, setTypeHouseId}: PropertyCreateHouseProps) => {
  const arrPropertyItems: PropertyItem[] = [
    {
      id: '1',
      title: 'House',
      imgPath: 'https://a0.muscache.com/pictures/4d7580e1-4ab2-4d26-a3d6-97f9555ba8f9.jpg'
    },
    {
      id: '2',
      title: 'Apartment',
      imgPath: 'https://a0.muscache.com/pictures/21cfc7c9-5457-494d-9779-7b0c21d81a25.jpg'
    },
    {
      id: '3',
      title: 'Guesthouse',
      imgPath: 'https://a0.muscache.com/pictures/6f261426-2e47-4c91-8b1a-7a847da2b21b.jpg'
    }
  ];

  useEffect(() => {
    // Cập nhật giá trị mới của typeHouseId
    console.log(typeHouseId);
  }, [typeHouseId]);

  return (
    <div className="grid grid-cols-3 gap-x-10 mobile:gap-y-5   grid-rows-1 mobile:grid-cols-1 mobile:grid-rows-3">
      {arrPropertyItems.map((item: PropertyItem, index: number) => {
        return (
          <div className="w-full h-full flex justify-center" key={index}>
            <motion.button
              className={`w-full h-[130px] border-2 rounded-2xl box-border p-2 mobile:w-full
              mobile:mb-5
                            ${typeHouseId.includes(item.id) ? 'border-black' : ''}
                          `}
              variants={variantsPropertyItems}
              whileTap={{ scale: 0.8 }}
              transition={{ duration: 0.5 }}
              onClick={(event) => {
                const updatedTypeHouseId = [...typeHouseId];
                // Kiểm tra xem item.title đã tồn tại trong mảng hay chưa
                if (updatedTypeHouseId.includes(item.id)) {
                  const index = updatedTypeHouseId.indexOf(item.id);
                  updatedTypeHouseId.splice(index, 1); // Loại bỏ phần tử nếu đã tồn tại
                } else {
                  updatedTypeHouseId.push(item.id); // Thêm phần tử nếu chưa tồn tại
                }

                // Cập nhật giá trị mới của typeHouseId
                setTypeHouseId(updatedTypeHouseId);
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