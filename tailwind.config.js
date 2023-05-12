/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      screens: {
        desktop: { min: '1401px' },
        laptop: { max: '1400px', min: '1150px' },
        tablet: { max: '1149px', min: '800px' },
        mobile: { max: '799px' }
      },
      colors: {
        mask: 'rgba(105,105,105, 0.4)',
      },
      keyframes: {
        hiddenAnimate: {
          '0%': { visibility: 'visible' },
          '100%': { visibility: 'hidden' }
        },
        showAnimate: {
          '0%': { visibility: 'hidden' },
          '100%': { visibility: 'visible' }
        },
        slideDownHeader: {
          '0%': { transform: 'translateY(0)', scale: '1', opacity: '1' },
          '100%': { transform: 'translateY(10px)', scale: '1.3', opacity: '0' }
        },
        slideDownControl: {
          '0%': { height: '0px' },
          '100%': { height: '80px' }
        },

        slideUpControl: {
          '0%': { height: '80px' },
          '100%': { height: '0px' }
        },
        slideUpHeader: {
          '0%': { transform: 'translateY(10px)', scale: '1.3', opacity: '0' },
          '100%': { transform: 'translateY(0)', scale: '1', opacity: '1' }
        },

        slideUpLogin: {
          '0%': { transform: 'translateY(1200px)' },
          '100%': { transform: 'translateY(0px)' }
        },
        slideDownLogin: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(1200px)' }
        },

        transparentAnimate: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        transparentAnimateReverse: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        },

        boxInputLoginFocus_title: {
          '0%': { height: '100%' },
          '100%': { height: '15px' }
        },
        boxInputLoginFocus_titleReverse: {
          '0%': { height: '15px' },
          '100%': { height: '100%' }
        },

        boxInputLoginFocus_input: {
          '0%': { height: '0px' },
          '100%': { height: 'auto' }
        },
        boxInputLoginFocus_inputReverse: {
          '0%': { height: 'auto' },
          '100%': { height: '0px' }
        },

        controlPanelSlideDown: {
          '0%': { height: '0px' },
          '100%': { height: '230px' }
        },
        controlPanelSlideUp: {
          '0%': { height: '230px' },
          '100%': { height: '0px' }
        }
      },
      animation: {
        showAnimate: 'showAnimate .1s forwards',
        hiddenAnimate: 'hiddenAnimate .5s forwards',
        slideDownHeader: 'slideDownHeader .5s ease-in-out forwards, hiddenAnimate .5s forwards',
        slideDownControl: 'showAnimate .1s forwards ,slideDownControl .5s ease-in-out forwards',

        slideUpControl: 'slideUpControl .5s ease-in-out forwards',
        slideUpHeader: 'showAnimate .1s forwards,slideUpHeader .6s ease-in-out forwards',

        // header
        transparentAnimate: 'showAnimate .1s forwards, transparentAnimate .5s ease-in-out forwards',
        transparentAnimateReverse:
          'showAnimate .1s forwards, transparentAnimateReverse .5s ease-in-out forwards',

        // login
        transparentAnimateLogin: 'transparentAnimate .5s ease-in-out forwards',
        transparentAnimateLoginReverse: 'transparentAnimateReverse .5s ease-in-out forwards',

        slideUpLogin: 'slideUpLogin .5s ease-in-out forwards',
        slideDownLogin: 'slideDownLogin .5s ease-in-out forwards',

        boxInputLoginFocus_input: 'boxInputLoginFocus_input .5s ease-in-out forwards',
        boxInputLoginFocus_inputReverse: 'boxInputLoginFocus_inputReverse .5s ease-in-out forwards',
        boxInputLoginFocus_title: 'boxInputLoginFocus_title .5s ease-in-out forwards',
        boxInputLoginFocus_titleReverse: 'boxInputLoginFocus_titleReverse .5s ease-in-out forwards',

        controlPanelSlideDown:
          'showAnimate .1s forwards, controlPanelSlideDown .5s ease-in-out forwards',
        controlPanelSlideUp:
          'controlPanelSlideUp .5s ease-in-out forwards, hiddenAnimate .5s forwards',

        transparentAnimateLogin2:
          'showAnimate .1s forwards, transparentAnimate .5s ease-in-out forwards ',
        transparentAnimateLoginReverse2:
          'transparentAnimateReverse .5s ease-in-out forwards, hiddenAnimate .5s forwards'
      },
      backgroundColor: {
        ColorBgFooter: '#F7F7F7'
      },
      borderColor: {
        colorBorderBottom: 'rgb(221,221,221)'
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ]
};
