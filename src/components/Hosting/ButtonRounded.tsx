import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface ButtonProps {
  image?: string | StaticImageData;
  icon?: JSX.Element;
  title?: String;
  // onClick?: () => void;
}

function ButtonRounded(props: ButtonProps): JSX.Element {
  const { image, icon, title } = props;

  return (
    <button className="w-[45px] h-[45px] rounded-[50%] border flex items-center justify-center p-1">
      {icon && icon}
      {image && <Image src={image} alt="avatar" className="object-cover" />}
      {title && title}
    </button>
  );
}

export default ButtonRounded;
