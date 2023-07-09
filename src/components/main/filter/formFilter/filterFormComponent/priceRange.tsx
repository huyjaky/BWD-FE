import { filterContext } from '@/contexts/filter';
import Slider from 'rc-slider';
import { useContext, useState } from 'react';
import { AiOutlineMinus } from 'react-icons/ai';

const PriceRange = () => {
  const { filterForm, setFilterForm } = useContext(filterContext);
  const handleOnChange = (value: any) => {
    setFilterForm({ ...filterForm, minPrice: value[0], maxPrice: value[1] });

    const inputMin = document.getElementById('inputMin') as HTMLInputElement;
    const inputMax = document.getElementById('inputMax') as HTMLInputElement;
    if (inputMin && inputMax) {
      inputMin.value = '';
      inputMax.value = '';
    }
  };

  return (
    <div className="w-full border-b-2 pb-10 border-slate-500">
      <div className="w-full h-[6.25rem] flex box-border px-6">
        <Slider
          range
          allowCross={false}
          draggableTrack
          defaultValue={[10, 250]}
          onChange={handleOnChange}
          value={[filterForm.minPrice, filterForm.maxPrice]}
          className="m-auto "
          min={10}
          max={250}
          trackStyle={{ backgroundColor: 'black', height: 2 }}
          railStyle={{ height: 2 }}
          handleStyle={{
            backgroundColor: '#FFFFFF',
            opacity: 1,
            border: '1px solid grey',
            width: 30,
            height: 30,
            marginTop: -13
          }}
        />
      </div>
      <div className="w-full h-[4.5rem] flex mobile:w-full mobile:flex-col mobile:h-fit ">
        {/* min */}
        <div className="flex-1 h-full border-2 rounded-2xl flex items-center mobile:py-3
        mobile:mb-5
        ">
          <div className="w-full h-fit flex flex-col box-border px-6">
            <span>Minimum</span>
            <div className="w-full flex">
              &#36;
              <input
                type="number"
                id="inputMin"
                placeholder={filterForm.minPrice + ''}
                className="outline-none overflow-y-hidden"
                onChange={(event) => {
                  const temp = Number.parseInt(event.target.value);
                  if (temp < 10 || temp > filterForm.maxPrice || !temp) return;
                  setFilterForm({ ...filterForm, minPrice: temp });
                }}
              />
            </div>
          </div>
        </div>

        <div className="w-[3rem] h-full flex mobile:hidden ">
          <AiOutlineMinus className="m-auto text-[2rem]" />
        </div>

        {/* max */}
        <div className="flex-1 h-full border-2 rounded-2xl flex items-center mobile:py-3">
          <div className="w-full h-fit flex flex-col box-border px-6 ">
            <span>Maximum</span>
            <div className="w-full flex">
              &#36;
              <input
                type="number"
                id="inputMax"
                placeholder={filterForm.maxPrice + ''}
                className="outline-none overflow-y-hidden"
                onChange={(event) => {
                  const temp = Number.parseInt(event.target.value);
                  if (temp > 250 || temp < filterForm.minPrice || !temp) return;
                  setFilterForm({ ...filterForm, maxPrice: temp });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PriceRange;
