import React from 'react';
import styled, { DefaultTheme } from 'styled-components';

export interface PageProps {
  className?: string;
  helmet?: React.ReactElement;
  children?: React.ReactNode;
  backgroundColor?: DefaultTheme['colors'];
}

const Root = styled.div<PageProps>`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  max-width: 100%;
  min-width: 0;
  background-color: ${({ theme, backgroundColor }) => theme.colors[backgroundColor] || 'white'};
`;

export const Page = ({
  className,
  helmet,
  children,
  backgroundColor,
}: PageProps) => (
  <Root
    className={`pulley-page ${className || ''}`}
    backgroundColor={backgroundColor}
  >
    {helmet}
    {children}
  </Root>
);
