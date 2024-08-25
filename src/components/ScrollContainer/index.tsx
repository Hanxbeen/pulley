import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

export interface ScrollContainerProps {
  height?: string;
  children: React.ReactNode;
}

const BaseScrollContainer = styled.div<ScrollContainerProps>`
  overflow-y: scroll; 
  height: ${({ height }) => height || '100%'};
  width: 100%;
  box-sizing: border-box;
  scrollbar-width: none; 
  -ms-overflow-style: none; 

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  &.scrolling {
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 4px;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }
    scrollbar-width: thin; 
  }
`;

const ScrollContainer = ({ height, children }: ScrollContainerProps) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    setIsScrolling(true);

    if (scrollTimeout.current !== undefined) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = window.setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  useEffect(() => {
    const containerElement = containerRef.current;
    if (containerElement) {
      containerElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (containerElement) {
        containerElement.removeEventListener('scroll', handleScroll);
      }
      if (scrollTimeout.current !== undefined) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <BaseScrollContainer
      height={height}
      ref={containerRef}
      className={isScrolling ? 'scrolling' : ''}
    >
      {children}
    </BaseScrollContainer>
  );
};

export default ScrollContainer;
