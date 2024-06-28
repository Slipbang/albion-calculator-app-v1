import styled from "styled-components";
import {resetButton,resetButtonHovered} from "../CommonImgReexports/CommonImgReexports";

interface IStyledResetButtonProps{
    $top: number;
    $right: number;
}

const StyledResetButton = styled.button<IStyledResetButtonProps>`
  position: absolute;
  top: ${props => `${props.$top}px`};
  right: ${props => `${props.$right}px`};
  width: 15px;
  height: 15px;
  z-index: 9999;
  background-color: transparent;
  border: none;
  background-image: url(${resetButton});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;

  &:hover {
    background-image: url(${resetButtonHovered});
  }
`;

export default StyledResetButton;