module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      mb: '0.9rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      colors: {
        red: '#E2293F',
        green: '#41C485',
        yellow: '#F3B404',
        // gray: '#C9C9C9',
        'black-main': '#101010',
      },
      width: {
        auto: 'auto',
      },
      height: {
        auto: 'auto',
        18: '4.5rem',
      },
      minHeight: {
        auto: 'auto',
        500: '500px',
        450: '450px',
        400: '400px',
      },
      boxShadow: {
        header: '1px 1px 10px rgba(255,255,255,0.5)',
        red: '1px 1px 15px #E2293F',
        green: '1px 1px 15px #41C485',
        yellow: '1px 1px 15px #F3B404',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3.25rem',
      },
      borderWidth: {
        3: '3px',
      },
      borderRadius: {
        full: '50%',
      },
    },
    screens: {
      sm: '640px',
      md: '992px',
      lg: '1170px',
      xl: '1360px',
      '2xl': '1440px',
    },
  },
  variants: {},
  plugins: [],
};
