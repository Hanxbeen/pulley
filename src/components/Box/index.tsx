import React from 'react';
import styled from 'styled-components';

export interface BoxProps {
  padding?: string;
  backgroundColor?: string;
  borderRadius?: string;
  children: React.ReactNode;
}

const Box = styled.div<BoxProps>`
  padding: ${({ padding }) => padding || '20px'};
  background-color: ${({ backgroundColor }) => backgroundColor || '#ffffff'};
  border-radius: ${({ borderRadius }) => borderRadius || '8px'};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
`;

export const BoxContainer = ({ children, padding, backgroundColor, borderRadius }: BoxProps) => {
  return (
    <Box padding={padding} backgroundColor={backgroundColor} borderRadius={borderRadius}>
      {children}
    </Box>
  );
};
