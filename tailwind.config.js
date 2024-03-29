/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{html,js,jsx,tsx,ts}',
    './src/styles/**/*.{js,jsx,tsx,ts}',
  ],
  theme: {
    extend: {
      screens: {
        desktop: { min: '1401px' },
        laptop: { max: '1400px', min: '1150px' },
        tablet: { max: '1149px', min: '950px' },
        mobile: { max: '949px' }
      },


      gridTemplateAreas: {
        layoutPicture: ['h1 h1 h2 h3', 'h1 h1 h4 h5'],
        layoutEditDesktopLaptop: [
          'locale locale capacity',
          'locale locale orientation',
          'locale locale baths',
          'locale locale beds',
          'price price price',
          'title title title',
          'des des des',
          'placeoffer placeoffer placeoffer',
          'img img img'
        ],
        layoutEditTabletMobile: [
          'locale locale',
          'capacity orientation',
          'baths beds',
          'price price',
          'title title',
          'des des',
          'placeoffer placeoffer',
          'img img'
        ],
        layoutEditMobile: [
          'locale locale',
          'capacity capacity',
          'orientation orientation',
          'baths baths',
          'beds beds',
          'price price',
          'title title',
          'des des',
          'placeoffer placeoffer',
          'img img'
        ],
        layoutCreateHouseDesktopLaptop: [
          'title title title',
          'des des des',
          'price price price',
          'placeoffer placeoffer capacity',
          'placeoffer placeoffer orientation',
          'placeoffer placeoffer baths',
          'placeoffer placeoffer beds',
          'typehouse typehouse typehouse'
        ],
        layoutCreateHouseTabletMobile: [
          'title title title',
          'des des des',
          'price price price',
          'placeoffer placeoffer placeoffer',
          'capacity baths beds',
          'orientation orientation orientation',
          'typehouse typehouse typehouse'
        ],
      },
      gridTemplateColumns: {
        houseBox: 'repeat(auto-fill, minmax(19rem, 1fr))',
        layoutPicture: '1fr 1fr 1fr 1fr',
        layoutShowAllPt: '350px 350px',
        newsBox: 'repeat(auto-fill, minmax(37rem, 1fr))',
        contact: 'repeat(auto-fill, minmax(20rem, 1fr))',
      },
      gridTemplateRows: {
        layoutPicture: '225px 225px',
        layoutShowAllPt: '200px'
      },

      colors: {
        mask: 'rgba(105,105,105, 0.4)',
        redIcon: 'rgba(255, 56, 92, 0.8)'
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


      },
      animation: {
        showAnimate: 'showAnimate .1s forwards',
        hiddenAnimate: 'hiddenAnimate .3s forwards',
        slideDownHeader: 'slideDownHeader .3s ease-in-out forwards, hiddenAnimate .3s forwards',
        slideDownControl: 'showAnimate .1s forwards ,slideDownControl .3s ease-in-out forwards',

        slideUpControl: 'slideUpControl .3s ease-in-out forwards',
        slideUpHeader: 'showAnimate .1s forwards,slideUpHeader .3s ease-in-out forwards',

        // header
        transparentAnimate: 'showAnimate .1s forwards, transparentAnimate .3s ease-in-out forwards',
        transparentAnimateReverse:
          'transparentAnimateReverse .3s ease-in-out forwards, hiddenAnimate .3s ease-in-out forwards ',

        // login
        transparentAnimateLogin: 'transparentAnimate .5s ease-in-out forwards',
        transparentAnimateLoginReverse: 'transparentAnimateReverse .5s ease-in-out forwards',

        slideUpLogin: 'slideUpLogin .5s ease-in-out forwards',
        slideDownLogin: 'slideDownLogin .5s ease-in-out forwards',

        boxInputLoginFocus_input: 'boxInputLoginFocus_input .5s ease-in-out forwards',
        boxInputLoginFocus_inputReverse: 'boxInputLoginFocus_inputReverse .5s ease-in-out forwards',
        boxInputLoginFocus_title: 'boxInputLoginFocus_title .5s ease-in-out forwards',
        boxInputLoginFocus_titleReverse: 'boxInputLoginFocus_titleReverse .5s ease-in-out forwards',

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
      },
      boxShadow: {
        shadowHeadhost: '0 5px 20px 0 rgba(31,38,135,.37)'
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@savvywombat/tailwindcss-grid-areas'),
    require('daisyui'),

  ],
  daisyui: {
    themes: true,
    styled: false,
    darkTheme: 'dark'
  }
};
