import React from 'react';
import styled, { DefaultTheme } from 'styled-components';

export interface ContainerProps {
  className?: string;
  horizontal?: number;
  backgroundColor?: DefaultTheme['colors'];
  children: React.ReactNode;
}

const StyledContainer = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  max-width: 1280px;
  margin: 0 auto;
  background-color: ${({ theme, backgroundColor }) => theme.colors[backgroundColor] || 'inherit'};
`;

export const Container = ({
  className,
  horizontal,
  backgroundColor,
  children,
}: ContainerProps) => {
  return (
    <StyledContainer
      className={`pulley-container ${className || ''}`}
      horizontal={horizontal}
      backgroundColor={backgroundColor}
    >
      {children}
    </StyledContainer>
  );
};
