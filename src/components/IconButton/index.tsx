import React from 'react';
import Button, { ButtonProps } from 'components/Button';
import Icon, { IconProps } from 'components/Icon';
import Stack from 'components/Stack';
import styled, { DefaultTheme, css } from 'styled-components';

interface IconButtonProps extends ButtonProps {
  name: IconProps['name'];
  iconColor?: IconProps['color'];
  iconPosition?: 'before' | 'after';
  hoverColor?: keyof DefaultTheme['colors'];
}

const StyledIconButton = styled(Button) <Omit<IconButtonProps, 'name' | 'iconColor'>>`
  display: inline-flex;
  align-items: center;

  &:hover {
    background-color: ${({ theme, hoverColor, color = 'lightGray' }) =>
    hoverColor ? theme.colors[hoverColor] : theme.colors[color]};

    & svg path {
      fill: ${({ theme, hoverColor, color = 'lightGray' }) =>
    hoverColor ? theme.colors[hoverColor] : theme.colors[color]} !important;
    }
  }
`;

const IconButton = ({
  name,
  iconPosition = 'before',
  color = 'lightGray',
  iconColor = 'lightGray',
  hoverColor,
  children,
  ...props
}: IconButtonProps) => {
  return (
    <StyledIconButton
      {...props}
      color={color}
      hoverColor={hoverColor}
    >
      <Stack gap="8px" vertical={false} alignment='center'>
        {iconPosition === 'before' && (
          <Icon
            name={name}
            color={iconColor}
          />
        )}
        {children}
        {iconPosition === 'after' && (
          <Icon
            name={name}
            color={iconColor}
          />
        )}
      </Stack>
    </StyledIconButton>
  );
};

export default IconButton;
