import React from 'react';
import styled, { css, DefaultTheme } from 'styled-components';
import Icon from 'components/Icon';
import Stack from 'components/Stack';

interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'plain';
  color?: keyof DefaultTheme['colors'];
  hoverColor?: keyof DefaultTheme['colors'];
  size?: 'l' | 'm' | 's';
  fullWidth?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  onClick?: () => void;
}

const sizeStyles = {
  l: css`
    padding: 12px 24px;
    font-size: 16px;
  `,
  m: css`
    padding: 8px 16px;
    font-size: 14px;
  `,
  s: css`
    padding: 4px 8px;
    font-size: 12px;
  `,
};

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  cursor: ${({ readOnly, disabled }) => (
    readOnly
      ? 'default'
      : disabled
        ? 'not-allowed'
        : 'pointer'
  )};
  opacity: ${({ readOnly, disabled }) => readOnly || disabled ? 0.6 : 1};
  transition: background-color 0.3s ease, color 0.3s ease, opacity 0.3s ease;

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  ${({ size = 'm' }) => sizeStyles[size]}

  ${({ variant, color = 'primary', hoverColor, theme, readOnly, disabled }) => {
    const buttonColor = theme.colors[color];

    if (readOnly || disabled) {
      return css`
        background-color: ${buttonColor};
        color: ${theme.colors.gray};
        &:hover {
          opacity: 0.6;
          text-decoration: none;
        }
      `;
    }

    switch (variant) {
      case 'primary':
        return css`
          background-color: ${buttonColor};
          color: ${hoverColor ? theme.colors[hoverColor] : theme.colors.primary};

          &:hover {
            background-color: ${theme.colors[color] || theme.colors.secondary};
          }
        `;
      case 'plain':
        return css`
          background-color: transparent;
          color: ${theme.colors.lightGray};
          padding: 0;
          border-radius: 0;

          &:hover {
            color: ${hoverColor ? theme.colors[hoverColor] : theme.colors.lightGray};
          }
        `;
      default:
        return css`
          background-color: #e0e0e0;
          color: #333;

          &:hover {
            background-color: #d5d5d5;
          }
        `;
    }
  }}
`;

const Button = ({
  children,
  variant = 'primary',
  color = 'primary',
  hoverColor = 'primary',
  size = 'm',
  fullWidth = false,
  readOnly = false,
  disabled = false,
  accessibilityLabel,
  onClick,
}: ButtonProps) => {
  return (
    <StyledButton
      variant={variant}
      color={color}
      hoverColor={hoverColor}
      size={size}
      fullWidth={fullWidth}
      readOnly={readOnly}
      disabled={disabled}
      aria-label={accessibilityLabel}
      onClick={readOnly || disabled ? undefined : onClick}
    >
      {children}
    </StyledButton>
  );
};

export type { ButtonProps }
export default Button;
