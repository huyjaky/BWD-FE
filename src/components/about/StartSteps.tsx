import styles from '../../styles';
interface StartStepsProps {
  number: string;
  text: string;
}

const StartSteps = ({ number, text }: StartStepsProps) => (
  <div className={`${styles.flexCenter} flex-row`}>
    <div className={`${styles.flexCenter} w-[4.5rem] h-[4.5rem] rounded-[2rem] bg-[#323F5D]`}>
      <p className="font-bold text-[1rem] text-white">{number}</p>
    </div>
    <p className="flex-1 ml-[2rem] font-normal text-[1rem] text-slate-800 leading-[2rem]">
      {text}
    </p>
  </div>
);

export default StartSteps;
