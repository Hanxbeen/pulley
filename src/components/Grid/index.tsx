import React, { HTMLAttributes } from 'react';
import styled, { DefaultTheme } from 'styled-components';

import Unit, { UnitProps } from './components/Unit';

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  wrap?: boolean | Partial<Record<keyof DefaultTheme['breakpoints'], boolean>>;
  gap?: string | Partial<Record<keyof DefaultTheme['breakpoints'], string>>;
  children: React.ReactNode;
}

const GridBase = styled.div<GridProps>`
  display: flex;
  flex-wrap: ${({ wrap }) => (wrap ? 'wrap' : 'nowrap')};
  gap: ${({ gap }) => gap || '0px'};
  width: 100%;
  box-sizing: border-box;
  padding: 0 ${({ gap }) => gap || '0px'};
`;

const Grid = ({
  className,
  wrap = false,
  gap,
  children,
}: GridProps) => (
  <GridBase
    className={`pulley-grid ${className || ''}`}
    wrap={wrap}
    gap={gap}
  >
    {children}
  </GridBase>
);

Grid.Unit = Unit;

export { Unit };
export default Grid;
export type { UnitProps as GridUnitProps, GridProps };
