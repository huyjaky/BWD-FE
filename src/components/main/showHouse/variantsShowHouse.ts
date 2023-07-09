import { Variants } from 'framer-motion';

export const variants: Variants = {
  showIconControl: {
    width: 160
  },
  hiddenIconControl: {
    width: 60
  },
  show: {
    opacity: [0, 1]
  },
  hidden: {
    opacity: [1, 0],
    transition: {
      delay: 0.1
    },
    transitionEnd: {
      display: 'none'
    }
  },
  iconAnimate: {
    borderRadius: [
      '50% 50% 20% 80% / 25% 80% 20% 75%',
      '67% 33% 47% 53% / 37% 20% 80% 63%',
      '39% 61% 47% 53% / 37% 40% 60% 63%',
      '39% 61% 82% 18% / 74% 40% 60% 26%',
      '50% 50% 53% 47% / 26% 22% 78% 74%',
      '50% 50% 20% 80% / 25% 80% 20% 75%',
      '30% 70% 70% 30% / 30% 52% 48% 70%',
      '20% 80% 20% 80% / 20% 80% 20% 80%'
    ],
    transition: {
      duration: 10,
      repeat: Infinity,
      type: 'tween'
    }
  },
  iconAnimateBg: {
    borderRadius: [
      '60% 40% 30% 70% / 60% 30% 70% 40%',
      '30% 60% 70% 40% / 50% 60% 30% 60%',
      '60% 40% 30% 70% / 60% 30% 70% 40%'
    ],
    transition: {
      duration: 10,
      repeat: Infinity,
      type: 'tween'
    }
  },

  showMask: {
    display: 'flex',
    opacity: [0, 1]
  },
  hiddenMask: {
    opacity: [1, 0],
    transitionEnd: {
      display: 'none'
    }
  },

  showMaskMap: {
    visibility: 'visible',
    opacity: [0, 1]
  },
  hiddenMaskMap: {
    opacity: [1, 0],
    transitionEnd: {
      visibility: 'hidden'
    }
  },
  hoverItem: {
    scale: 1.03,
    boxShadow:
     'rgba(240, 46, 170, 0.4) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px, rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px',
    transition: {
      delay: 0,
      type: 'spring'
    }
  }
};
