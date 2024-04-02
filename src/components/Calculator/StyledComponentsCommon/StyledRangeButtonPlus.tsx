import styled from "styled-components";
import {inputPlus, inputPlusHovered, inputPlusActive, inputPlusInactive} from "../CommonImgReexports/CommonImgReexports";

interface IStyledRangeButtonPlusProps{
    $isButtonActive: boolean;
}

const StyledRangeButtonPlus = styled.button<IStyledRangeButtonPlusProps>`
  z-index: 1;
  background-color: transparent;
  border: none;
  background-image: ${props => `url(${props.$isButtonActive ? inputPlus : inputPlusInactive})`}; 
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 22px;
  height: 19px;
  margin-left: -1px;
  cursor: pointer;

  &:hover {
    ${props => props.$isButtonActive ? `background-image: url(${inputPlusHovered});` : ''}
  }
  
  &:active{
    ${props => props.$isButtonActive ? `background-image: url(${inputPlusActive});` : ''}
  }
`;

export default StyledRangeButtonPlus;