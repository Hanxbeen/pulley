import React from 'react';
import styled from 'styled-components';
import { Theme } from 'styles/theme';

interface TextProps {
  typography: keyof Theme['typography'];
  color?: keyof Theme['colors'];
  weight?: 'bold' | 'semiBold' | 'regular';
  inline?: boolean;
  decoration?: string;
  children: React.ReactNode;
}

const BaseText = styled.span<TextProps>`
  font-size: ${({ typography, theme }) => theme.typography[typography].fontSize};
  letter-spacing: ${({ typography, theme }) => theme.typography[typography].letterSpacing};
  line-height: ${({ typography, theme }) => theme.typography[typography].lineHeight};
  color: ${({ color, theme }) => (color ? theme.colors[color] : '#333')};
  display: ${({ inline }) => (inline ? 'inline' : 'block')};
  text-decoration: ${({ decoration }) => decoration || 'none'};
  font-weight: ${({ weight }) => (
    weight === 'bold'
    ? 700
    : weight === 'semiBold'
    ? 600
    : 400
  )};
`;

const Text = ({
  typography,
  color,
  weight = 'regular',
  inline,
  decoration,
  children,
}: TextProps) => {
  return (
    <BaseText
      typography={typography}
      color={color}
      weight={weight}
      inline={inline}
      decoration={decoration}
    >
      {children}
    </BaseText>
  );
};

export type { TextProps }
export default Text;