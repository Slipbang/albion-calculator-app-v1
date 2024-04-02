import styled from "styled-components";
import {
    decreasePriceButtonClicked,
    decreasePriceButtonHovered,
    decreasePriceButtonInactive
} from "../MarketItemImgReexports/MarketItemImgReexports";


interface IStyledDecreasePriceButtonProps{
    $isDisabled: boolean;
}

const StyledDecreasePriceButton = styled.button<IStyledDecreasePriceButtonProps>`
  ${props => props.$isDisabled ? `background-image: url(${decreasePriceButtonInactive});` : ''};
  
  position: absolute;
  background-color: transparent;
  border: none;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  z-index: 9999;
  margin-left: 5px;
  margin-top: 4px;

  width: 19px;
  height: 19px;
  
  &:hover{
    ${props => !props.$isDisabled ? `background-image: url(${decreasePriceButtonHovered});` : ''};
  }
  
  &:active{
    ${props => !props.$isDisabled ? `background-image: url(${decreasePriceButtonClicked});` : ''};
  }
`;

export default StyledDecreasePriceButton;