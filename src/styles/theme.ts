import { css } from 'styled-components';

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    lightGray: string;
    white: string;
    black: string;
    gray: string;
    alert: string;
    warning: string;
    positive: string;
  };
  typography: {
    h1: {
      fontSize: string;
      letterSpacing: string;
      lineHeight: string;
    };
    h2: {
      fontSize: string;
      letterSpacing: string;
      lineHeight: string;
    };
    h3: {
      fontSize: string;
      letterSpacing: string;
      lineHeight: string;
    };
    h4: {
      fontSize: string;
      letterSpacing: string;
      lineHeight: string;
    };
    body1: {
      fontSize: string;
      letterSpacing: string;
      lineHeight: string;
    };
    body2: {
      fontSize: string;
      letterSpacing: string;
      lineHeight: string;
    };
    caption1: {
      fontSize: string;
      letterSpacing: string;
      lineHeight: string;
    };
    caption2: {
      fontSize: string;
      letterSpacing: string;
      lineHeight: string;
    };
  };
}

export const theme: Theme = {
  colors: {
    primary: '#00ABFF',
    secondary: '#5C5C5C',
    lightGray: '#959595',
    white: '#ffffff',
    black: '#000000',
    gray: '#707070',
    alert: '#FD5354',
    warning: '#ff9800',
    positive: '#54C0B1',
  },
  typography: {
    h1: {
      fontSize: '32px',
      letterSpacing: '-0.01em',
      lineHeight: '40px',
    },
    h2: {
      fontSize: '28px',
      letterSpacing: '-0.01em',
      lineHeight: '36px',
    },
    h3: {
      fontSize: '24px',
      letterSpacing: '-0.01em',
      lineHeight: '32px',
    },
    h4: {
      fontSize: '20px',
      letterSpacing: '-0.01em',
      lineHeight: '28px',
    },
    body1: {
      fontSize: '16px',
      letterSpacing: '-0.01em',
      lineHeight: '24px',
    },
    body2: {
      fontSize: '14px',
      letterSpacing: '-0.002em',
      lineHeight: '21px',
    },
    caption1: {
      fontSize: '12px',
      letterSpacing: '0',
      lineHeight: '18px',
    },
    caption2: {
      fontSize: '10px',
      letterSpacing: '0',
      lineHeight: '16px',
    },
  },
};
