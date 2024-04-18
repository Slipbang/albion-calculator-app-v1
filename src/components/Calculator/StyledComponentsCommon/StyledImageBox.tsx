import styled from 'styled-components';
import {CSSProperties} from "react";

interface IStyledImageBoxProps {
    $position: string;
    $image: string
    $width: number;
    $height: number;
    $top?: number;
    $left?: number;
    $hasDropShadow?: boolean;
    $backgroundPosition?: string;
    $zIndex?: number;
    $margin?: string;
    $hasPointer?: boolean;
    $isVisible?: boolean;
    $styles?: CSSProperties;
}


const StyledImageBox = styled.div<IStyledImageBoxProps>`
  ${props => !!props.$margin ? `margin: ${props.$margin};` : ''}
  ${props => !!props.$hasPointer ? 'cursor: pointer;' : ''}
  position: ${props => `${props.$position}`};
  z-index: ${props => !!props.$zIndex ? props.$zIndex : 9999};
  width: ${props => `${props.$width}px`};
  height: ${props => `${props.$height}px`};
  top: ${props => `${props.$top}px`};
  left: ${props => `${props.$left}px`};
  ${props => !!props.$hasDropShadow ? `filter: drop-shadow(3px 3px 6px black);` : ''}
  
  background-image: ${props => `url(${props.$image})`};
  background-position: ${props => !props.$backgroundPosition ? 'center' : props.$backgroundPosition};
  background-repeat: no-repeat;
  background-size: cover;
  
`;

export default StyledImageBox;