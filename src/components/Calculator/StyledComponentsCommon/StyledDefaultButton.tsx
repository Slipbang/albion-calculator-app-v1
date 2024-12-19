import styled from "styled-components";
import {defaultButton, defaultButtonHovered, defaultButtonClicked} from "../CommonImgReexports/CommonImgReexports";

interface IStyledDefaultButtonProps {
    $width: number;
    $height: number;
}

const StyledDefaultButton = styled.button<IStyledDefaultButtonProps>`
  z-index: 9999;
  background-color: transparent;
  border: none;
  background-image: url(${defaultButton});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: ${props => props.$width}px;
  height: ${props => props.$height}px;
  filter: drop-shadow(1px 1px 2px black);
  cursor: pointer;
  color: rgb(196,152,58);
  text-align: center;
  
  &:disabled {
    background-image: url(${defaultButtonClicked});
    color: rgb(129,104,49);
  }

  &:hover {
    background-image: url(${defaultButtonHovered});
  }

  &:active {
    background-image: url(${defaultButtonClicked});
    color: rgb(129,104,49);
  }
`;

export default StyledDefaultButton;