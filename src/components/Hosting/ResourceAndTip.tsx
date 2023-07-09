import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface ResourceAndTipProps {
  ImgLink: string | StaticImageData;
  title: string;
}

const ResourceAndTip: React.FC<ResourceAndTipProps> = ({ ImgLink, title }) => {
  return (
    <div
      className="w-[100%] h-[100%] mobile:w-[60%] rounded-[1rem] border pb-[1rem] cursor-pointer
        "
    >
      <Image src={ImgLink} alt="" className="h-[70%] w-[100%] object-cover rounded-t-[1rem]" />
      <div className="w-[100%] h-[30%] p-[2rem]">
        <p className="text-start ">{title}</p>
      </div>
    </div>
  );
};

export default ResourceAndTip;
