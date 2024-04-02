import styled from "styled-components";
import {inputMinus, inputMinusHovered, inputMinusActive, inputMinusInactive} from "../CommonImgReexports/CommonImgReexports";

interface IStyledRangeButtonMinusProps{
    $isButtonActive: boolean;
}

const StyledRangeButtonMinus = styled.button<IStyledRangeButtonMinusProps>`
  z-index: 1;
  background-color: transparent;
  border: none;
  background-image: ${props => `url(${props.$isButtonActive ? inputMinus : inputMinusInactive})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 22px;
  height: 19px;
  cursor: pointer;

  &:hover {
    ${props => props.$isButtonActive ? `background-image: url(${inputMinusHovered});` : ''}
  }
  
  &:active{
    ${props => props.$isButtonActive ? `background-image: url(${inputMinusActive});` : ''}
  }
`;

export default StyledRangeButtonMinus;