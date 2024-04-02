import styled from "styled-components";
import {closeButton, closeButtonHovered} from "../CommonImgReexports/CommonImgReexports";


const StyledCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 9999;
  background-color: transparent;
  border: none;
  background-image: url(${closeButton});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 27px;
  height: 27px;
  filter: drop-shadow(1px 1px 3px black);
  cursor: pointer;

  &:hover {
    background-image: url(${closeButtonHovered});
  }
`;

export default StyledCloseButton;