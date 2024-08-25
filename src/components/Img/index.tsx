import React, { ImgHTMLAttributes } from 'react';
import styled from 'styled-components';

import baseFallbackImage from './statics/fallbackImage.png';

interface ImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackImageSrc?: string;
  fallbackImage?: boolean;
  width?: number;
  height?: number;
}

const StyledImg = styled.img<ImgProps>`
  height: ${({ height }) => height ? `${height}px` : 'auto' };
  width: ${({ width }) => width ? `${width}px` : 'auto' };
`;

const Img = ({
  className,
  src,
  alt = 'image',
  width,
  height,
  fallbackImage = true,
  fallbackImageSrc = baseFallbackImage,
  ...props
}: ImgProps) => (
  <StyledImg
    key={src}
    className={className}
    src={src || (fallbackImage ? fallbackImageSrc : undefined)}
    alt={alt}
    width={width}
    height={height}
    {...props}
  />
);

export type { ImgProps };

export default Img;
