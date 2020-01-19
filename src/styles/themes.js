const baseTheme = {
  fontSize: {
    small: '0.85rem',
    normal: '1rem',
    large: '1.25rem',
    extraLarge: '1.5rem'
  },
  font: {
    main: "'Roboto', sans-serif;"
  },
  fontWeight: {
    normal: '400',
    bold: '700'
  },
  space: {
    small: '0.25rem',
    medium: '0.5rem',
    large: '1rem',
    extraLarge: '2rem'
  },
  breakpoint: {
    medium: '600px',
    large: '1000px'
  }
};

const lightTheme = {
  ...baseTheme,
  color: {
    primary: '#6200EE',
    primaryVariant: '#3700B3',
    secondary: '#03DAC6',
    secondaryVariant: '#018786',
    background: '#FFFFFF',
    surface: '#f2f2f2',
    error: '#B00020',
    onPrimary: '#FFFFFF',
    onSecondary: '#000000',
    onBackground: '#000000',
    onSurface: '#000000',
    onError: '#FFFFFF',
    link: '#1890ff'
  }
};

const darkTheme = {
  ...baseTheme,
  color: {
    primary: '#BB86FC',
    primaryVariant: '#3700B3',
    secondary: '#03DAC6',
    secondaryVariant: '#018786',
    background: '#121212',
    surface: '#333333',
    error: '#CF6679',
    onPrimary: '#000000',
    onSecondary: '#000000',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    onError: '#000000',
    link: '#99ceff'
  }
};

export default {
  light: lightTheme,
  dark: darkTheme
};
