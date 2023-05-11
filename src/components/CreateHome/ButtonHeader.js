import React from 'react'

export default function ButtonHeader({ content }) {
    return (
        <button
            className='px-[16px] border-[1px] border-colorButtonHeader bg-transparent rounded-[32px] h-[40px] font-semibold
                hover:border-black ease-in duration-200 ml-[16px]
            '
        >{content}</button>
    )
}
