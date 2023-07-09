import React from 'react';

interface ButtonreservationProps {
  content: string;
  number: number;
  selected: string;
  setSelected: (title: string) => void;
}

const ButtonReservations: React.FC<ButtonreservationProps> = ({
  content,
  number,
  selected,
  setSelected
}) => {
  return (
    <button
      onClick={() => setSelected(content)}
      className={`px-[1rem] border-[.2rem] ${
        content === selected
          ? 'border-black bg-[#F7F7F7]'
          : 'border-colorButtonHeader bg-transparent'
      } rounded-[2rem] h-[2.4rem]
            hover:border-black ease-in duration-200 mr-[1rem] mb-[1rem] text-[1rem]`}
    >
      {content}
      <span className="ml-1">({number})</span>
    </button>
  );
};

export default ButtonReservations;
