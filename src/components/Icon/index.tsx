import React from 'react';
import { ReactSVG } from 'react-svg';
import styled, { DefaultTheme, useTheme } from 'styled-components';

interface IconProps {
  name: 'delete' | 'add-circle' | 'swap-horiz';
  width?: number;
  height?: number;
  color?: keyof DefaultTheme['colors'];
  className?: string;
}

const svgMap = {
  'delete': require('./statics/svgs/delete.svg').default,
  'add-circle': require('./statics/svgs/add-circle.svg').default,
  'swap-horiz': require('./statics/svgs/swap-horiz.svg').default,
};

const StyledIconContainer = styled.div`
  display: inline-block;
  transition: fill 0.3s ease;
  line-height: 0;
`;

const Icon = ({
  name,
  width = 16,
  height = 16,
  color = 'lightGray',
  className = '',
}: IconProps) => {
  const theme = useTheme();
  const fillColor = theme.colors[color];

  return (
    <StyledIconContainer className={className}>
      <ReactSVG
        src={svgMap[name]}
        beforeInjection={(svg) => {
          svg.setAttribute('width', `${width}`);
          svg.setAttribute('height', `${height}`);
          svg.querySelector('path')?.setAttribute('fill', fillColor);
        }}
      />
    </StyledIconContainer>
  );
};

export type { IconProps };
export default Icon;
