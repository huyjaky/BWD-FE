import styles from '../../styles';
interface NewFeaturesProps {
  imgUrl: string;
  title: string;
  subtitle: string;
}

const NewFeatures = ({ imgUrl, title, subtitle }: NewFeaturesProps) => (
  <div className="flex-1 flex flex-col sm:max-w-[16rem] min-w-[13rem]">
    <div className={`${styles.flexCenter} w-[4.5rem] h-[4.5rem] rounded-[2rem] bg-[#323F5D]`}>
      <img src={imgUrl} alt="icon" className="w-1/2 h-1/2 object-contain" />
    </div>
    <h1 className="mt-[2rem] font-bold text-[2rem] leading-[30.2rem] text-black">Title {title}</h1>
    <p className="flex-1 mt-[1rem] font-normal text-[1rem] text-slate-800 leading-[2rem]">
      {subtitle}
    </p>
  </div>
);

export default NewFeatures;
