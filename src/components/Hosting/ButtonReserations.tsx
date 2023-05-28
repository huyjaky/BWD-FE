import React from 'react';

interface ButtonreservationProps {
  content: string;
  number: number;
  selected: string;
  setSelected: (title: string) => void;
}

const ButtonReservations: React.FC<ButtonreservationProps> = ({ content, number, selected, setSelected }) => {
  return (
    <button
      onClick={() => setSelected(content)}
      className={`px-[16px] border-[2px] ${content === selected ? "border-black bg-[#F7F7F7]" : "border-colorButtonHeader bg-transparent"} rounded-[32px] h-[40px]
             hover:border-black ease-in duration-200 mr-[16px] mb-[16px] text-[14px]`}
    >
      {content}
      <span className='ml-1'>({number})</span>
    </button>
  );
};

export default ButtonReservations;
