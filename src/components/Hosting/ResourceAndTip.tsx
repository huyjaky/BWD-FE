import Image, { StaticImageData } from 'next/image';
import React from 'react'

interface ResourceAndTipProps {
    ImgLink: string | StaticImageData;
    title: string;
}

const ResourceAndTip: React.FC<ResourceAndTipProps> = ({ ImgLink, title }) => {
    return (
        <div className='w-[100%] h-[100%] mobile:w-[60%] rounded-[20px] border pb-[20px] cursor-pointer
        ' >
            <Image src={ImgLink} alt='' className='h-[70%] w-[100%] object-cover rounded-t-[20px]' />
            <div className='w-[100%] h-[30%] p-[24px]'>
                <p className='text-start '>{title}</p>
            </div>
        </div>
    )
}

export default ResourceAndTip;