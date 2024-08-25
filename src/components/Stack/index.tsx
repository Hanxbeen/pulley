import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface StackProps {
  gap?: string;
  vertical?: boolean;
  alignment?: 'start' | 'center' | 'end' | 'stretch';
  distribution?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
  className?: string;
}

const Root = styled.div<StackProps>`
  display: flex;
  flex-direction: ${({ vertical }) => (vertical ? 'column' : 'row')};
  gap: ${({ gap }) => gap || '0px'};
  align-items: ${({ alignment }) => alignment || 'stretch'};
  justify-content: ${({ distribution }) => distribution || 'flex-start'};
`;

const Stack = ({
  gap = '0px',
  vertical = false,
  alignment = 'stretch',
  distribution = 'start',
  className,
  children,
}: PropsWithChildren<StackProps>) => {
  return (
    <Root
      gap={gap}
      vertical={vertical}
      alignment={alignment}
      distribution={distribution}
      className={className}
    >
      {children}
    </Root>
  );
};

export default Stack;
export type { StackProps };
