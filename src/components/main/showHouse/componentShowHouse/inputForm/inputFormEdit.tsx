import { ReactNode } from "react";

interface InputFormEditProps {
  children: ReactNode;
  title: string;
  styleFieldset: string | undefined;
  styleLegend: string | undefined;
  styleDivAround: string | undefined;
}

const InputFormEdit = ({ children, styleFieldset, styleLegend, styleDivAround, title }: InputFormEditProps) => {
  return (
    <fieldset className={`border-2 h-fit rounded-xl pb-2 px-4 ${styleFieldset}`}>
      <legend className={`font-semibold text-[22px] ml-5 ${styleLegend}`}>{title}</legend>
      <div className={`w-full h-fit relative before:bottom-0 before:h-[.2rem] before:absolute
                    before:bg-slate-500 before:w-full before:transition-all before:duration-200
                    ${styleDivAround}
                    `}>
        {children}
      </div>
    </fieldset>
  )
}

export default InputFormEdit;