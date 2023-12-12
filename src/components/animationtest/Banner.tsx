import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { banner, letterAni } from "./animate";



const Banner = () => {
  const [playMarquee, setPlayMarquee] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPlayMarquee(true);
    }, 2000);
  }, []);
  return (

    <motion.div className='banner' variants={banner}>
      <BannerRowTop title={"Candy"} />
      <BannerRowCenter title={"News"} playMarquee={playMarquee} />
      <BannerRowBottom title={"studio"} />
    </motion.div>
  );
};

const AnimatedLetters = ({ title, disabled }:{
  title:any, disabled:any
}) => (
  <motion.span
    className='row-title'
    variants={disabled ? {} : banner}
    initial='initial'
    animate='animate'>
    {[...title].map((letter) => (
      <motion.span
        className='row-letter'
        variants={disabled ? {} : letterAni}>
        {letter}
      </motion.span>
    ))}
  </motion.span>
);

const BannerRowTop = ({ title }:{title:any}) => {
  return (
    <div className={"banner-row"}>
      <div className='row-col'>
        <AnimatedLetters title={title} disabled={undefined} />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          ease: "easeInOut",
          duration: 1,
          delay: 0.4,
        }}
        className='row-col'>
        <span className='row-message'>
          We are specialised in setting up the foundation of your brand and
          setting you up for success.
        </span>
      </motion.div>
    </div>
  );
};

const BannerRowBottom = ({ title }:{title:any}) => {
  return (
    <div className={"banner-row center"}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ ease: [0.6, 0.01, -0.05, 0.95], duration: 1, delay: 1 }}
        className='scroll shadow-2xl'>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 1,
            delay: 1.8,
          }}>
          scroll
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 1,
            delay: 1.8,
          }}>
          down
        </motion.span>
      </motion.div>
      <AnimatedLetters title={title} disabled={undefined} />
    </div>
  );
};

const BannerRowCenter = ({ title, playMarquee }:{title:any, playMarquee:any}) => {
  return (
    <div className={`banner-row marquee  ${playMarquee && "animate"}`}>
      <motion.div
        initial={{ y: 310 }}
        animate={{ y: 0 }}
        transition={{ ease: [0.6, 0.01, 0.05, 0.9], duration: 1 }}
        className='marquee__inner'>
        <AnimatedLetters title={title} disabled />
        <AnimatedLetters title={title} disabled={undefined} />
        <AnimatedLetters title={title} disabled />
        <AnimatedLetters title={title} disabled />
      </motion.div>
    </div>
  );
};

export default Banner;
