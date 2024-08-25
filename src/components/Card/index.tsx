import React from 'react';
import styled, { DefaultTheme } from 'styled-components';

interface CardProps {
  active?: boolean;
  renderHeader?: () => React.ReactNode;
  renderBody?: () => React.ReactNode;
  borderColor?: keyof DefaultTheme['colors'];
  backgroundColor?: keyof DefaultTheme['colors'];
}

const CardContainer = styled.div<{ active?: boolean, borderColor?: keyof DefaultTheme['colors']; backgroundColor?: keyof DefaultTheme['colors'] }>`
  background-color: ${({ theme, backgroundColor }) => backgroundColor ? theme.colors[backgroundColor] : theme.colors.white};
  border-radius: 8px;
  border: 1px solid ${({ theme, borderColor }) => borderColor ? theme.colors[borderColor] : theme.colors.gray};
  margin-bottom: 16px;
  ${({ theme, active }) =>
    active
      ? `
      border: 3px solid ${theme.colors.primary};
    `
      : `
      border: none;
    `
  }
`;

const CardHeader = styled.div``;
const CardBody = styled.div`
  padding: 16px;
`;

const Card = ({
  active,
  renderHeader,
  renderBody,
  borderColor,
  backgroundColor,
}: CardProps) => {
  return (
    <CardContainer active={active} borderColor={borderColor} backgroundColor={backgroundColor}>
      {renderHeader && <CardHeader>{renderHeader()}</CardHeader>}
      {renderBody && <CardBody>{renderBody()}</CardBody>}
    </CardContainer>
  );
};

export default Card;
