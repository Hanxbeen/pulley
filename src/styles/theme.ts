import { css } from 'styled-components';

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    white: string;
    black: string;
    gray: string;
    alert: string;
    warning: string;
    positive: string;
  };
  typography: {
    [key: string]: any;
  };
}

export const theme: Theme = {
  colors: {
    primary: '#f0542d',
    secondary: '#f8323e',
    white: '#ffffff',
    black: '#000000',
    gray: '#9C9DA4',
    alert: '#F8323E',
    warning: '#ff9800',
    positive: '#4caf50',
  },
  typography: {
    'headline.l': css`
      font-size: 32px;
    `,
    'headline.m': css`
      font-size: 28px;
    `,
    'headline.s': css`
      font-size: 24px;
    `,
    'title.l': css`
      font-size: 20px;
    `,
    'title.m': css`
      font-size: 18px;
    `,
    'title.s': css`
      font-size: 16px;
    `,
    'body.l': css`
      font-size: 14px;
    `,
    'body.m': css`
      font-size: 12px;
    `,
    'body.s': css`
      font-size: 10px;
    `,
    'label.l': css`
      font-size: 12px;
    `,
    'label.m': css`
      font-size: 10px;
    `,
    'label.s': css`
      font-size: 8px;
    `,
  },
};
