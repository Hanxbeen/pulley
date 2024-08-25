import React from 'react';
import styled, { DefaultTheme } from 'styled-components';

interface SectionProps {
  className?: string;
  vertical?: string;
  backgroundColor?: DefaultTheme['colors'];
  children: React.ReactNode;
}

const Root = styled.div<SectionProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-top: ${({ vertical }) => (vertical ? vertical : 0)}px;
  padding-bottom: ${({ vertical }) => (vertical ? vertical : 0)}px;
  background-color: ${({ theme, backgroundColor }) => theme.colors[backgroundColor] || 'inherit'};
  overflow: auto;
`;

export const Section = ({
  className,
  vertical,
  backgroundColor,
  children,
  ...props
}: SectionProps) => (
  <Root
    className={`pulley-section ${className || ''}`}
    vertical={vertical}
    backgroundColor={backgroundColor}
    {...props}
  >
    {children}
  </Root>
);
