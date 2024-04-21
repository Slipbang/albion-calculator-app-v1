import styled from 'styled-components';
import {craftTableCloseButton, craftTableOpenButton, craftTableCloseButtonHovered, craftTableOpenButtonHovered} from "../../DefaultCalculatorImgReexports/DefaultCalculatorImgReexports";

interface IStyledCraftTableButtonProps {
    $isCraftTableShown: boolean;
}

const StyledCraftTableButton = styled.button<IStyledCraftTableButtonProps>`
  background-color: transparent;
  border: none;
  width: 29px;
  height: 36px;
  background-image: ${props => props.$isCraftTableShown ? `url(${craftTableCloseButton})` : `url(${craftTableOpenButton})`};
  position: absolute;
  
  &:hover{
    background-image: ${props => props.$isCraftTableShown ? `url(${craftTableCloseButtonHovered})` : `url(${craftTableOpenButtonHovered})`};
  }
  
  filter: drop-shadow(3px 3px 6px black);

  
  top: 1rem;
  right: -23px;
  cursor: pointer;
  z-index: 9991;
  
  
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

export default StyledCraftTableButton;