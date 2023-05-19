import React from 'react';
import { House } from '../../../Icon_BnB_svg';

interface ChooTypeHoProps {
  name: string;
  icon: string | JSX.Element;
  type: string;
  description: string;
  selected: string;
  setselected: (title: string) => void;
}

const ChooTypeHo: React.FC<ChooTypeHoProps> = ({
  name,
  icon,
  description,
  selected,
  setselected
}) => {
  const handleOnclick = () => {
    setselected(name);
    if (selected == name) {
      setselected('');
    }
  };

  return (
    <button
      className="w-[100%] mb-3 border-[2px] border-[rgb(221,221,221) rounded-[12px] hover:border-[2px] hover:border-black"
      style={{
        backgroundColor: name === selected ? '#F7F7F7' : '',
        borderColor: name === selected ? 'black' : ''
      }}
      onClick={handleOnclick}
    >
      <div className="p-[24px] flex justify-between">
        <div className="text-start">
          <h2 className="text-[18px] font-semibold">{name}</h2>
          <p className="text-[14px] mt-[4px] text-[rgb(113,113,113)]">{description}</p>
        </div>
        <div className="w-[10%]">{icon}</div>
      </div>
    </button>
  );
};
export default ChooTypeHo;
