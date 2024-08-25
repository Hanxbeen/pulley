import { css } from 'styled-components';

export const breakpoints = {
  mobile: '320px',
  largeMobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  largeDesktop: '1280px',
};

export const map = (
  values: Partial<Record<keyof typeof breakpoints, any>>,
  callback: (value: any, breakpoint: keyof typeof breakpoints) => string
) => {
  return Object.entries(values).map(([breakpoint, value]) =>
    css`
      @media (min-width: ${breakpoints[breakpoint as keyof typeof breakpoints]}) {
        ${callback(value, breakpoint as keyof typeof breakpoints)};
      }
    `
  );
};
