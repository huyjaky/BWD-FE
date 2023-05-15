import React from 'react';

interface ChooDesPlProps {
  title: string;
  icon: string;
  selected: string;
  type: string,
  setselected: (title: string) => void;
  selectedMany: string[];
  setselectedMany: (titles: string[]) => void;

}

const ChooDesPl: React.FC<ChooDesPlProps> = ({ title, icon, type, selected, setselected, selectedMany = [], setselectedMany }) => {

  const handleOnclick = () => {
    if (type === "select1") {
      setselected(title)
      if (selected == title) {
        setselected('');
      }
    } else if (type === "selectMany") {
      setselectedMany([...selectedMany, title])
      if (selectedMany.includes(title)) {
        setselectedMany(selectedMany.filter((selected) => selected !== title))
      }
    }
  }

  return (
    <button
      className="rounded-[8px] border-[2px] border-colorButtonHeader px-[14px] pt-[9px] w-[100%] h-[105px]
flex flex-col ease-in duration-200 
mobile:w-[40vw]
hover:border-[2px] hover:border-black
"
      style={{
        backgroundColor: title === selected || selectedMany.includes(title) ? '#F7F7F7' : '',
        borderColor: title === selected || selectedMany.includes(title) ? 'black' : ''
      }}
      onClick={handleOnclick}
    >
      <div className='w-[45px] h-[45px] mb-2' >
        {icon}
      </div>
      <div className="font-semibold leading-5 text-left">{title}</div>
    </button>
  );
};

export default ChooDesPl;
