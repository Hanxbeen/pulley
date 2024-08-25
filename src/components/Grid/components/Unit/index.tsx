import { HTMLAttributes } from 'react';
import styled from 'styled-components';

import { map, breakpoints } from 'styles/mixins/breakpoint';

interface UnitProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: number | Partial<Record<keyof typeof breakpoints, number>>;
}

const Unit = styled.div.attrs(({ className }) => ({
  className: `pulley-grid-unit ${className}` as string,
}))<UnitProps>`
  ${({ ratio }) => {
    if (typeof ratio === 'number') {
      const val = ratio * 100;
      return `
        flex: 0 0 ${val}%;
        max-width: ${val}%;
      `;
    } else if (ratio) {
      return map(ratio, (val) => `
        flex: 0 0 ${val * 100}%;
        max-width: ${val * 100}%;
      `);
    }
    return '';
  }};
  box-sizing: border-box;
  overflow: hidden;
`;

export type { UnitProps };

export default Unit;
