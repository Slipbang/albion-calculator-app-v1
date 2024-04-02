import styled from 'styled-components';

interface IStyledMarketButtonProps{
    $left: number;
    $top: number;
    $buttonoimg: string;
    $hoverimg: string;
    $isSelected: boolean;
    $isMenuShown: boolean;

}

const StyledMarketButton = styled.button<IStyledMarketButtonProps>`
  position: absolute;
  left: ${props => `${props.$left + (props.$isSelected ? 0 : 10)}px`};
  top: ${props => `${props.$top}px`};
  background-color: transparent;
  border: none;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  z-index: ${props => !!props.$isSelected ? 9999 : -1};
  
  transition: transform 1s ease-in-out;
  
  ${props => !props.$isMenuShown ? 'transform: translate(50px,0);' : ''}

  width: 63px;
  height: 63px;
  background-image: ${props => props.$isSelected ? `url(${props.$hoverimg})` : `url(${props.$buttonoimg})`};
  
  &:hover{
    ${props => `background-image: url(${props.$hoverimg})`};
  }
`;

export default StyledMarketButton;