import styled from "styled-components";
import {backpackReset, backpackResetClicked, backpackResetHovered} from "../GameModeCalculator/Backpack/BackpackImgReexports/BackpackImgReexports";

interface IStyledCompleteResetButton {
    $isDemo?: boolean;
}

const StyledCompleteResetButton = styled.button<IStyledCompleteResetButton>`
  z-index: 5;
  background-color: transparent;
  border: none;
  background-image: url(${backpackReset});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 28px;
  height: 27px;
  filter: drop-shadow(1px 1px 2px black);
  cursor: pointer;

  &:hover {
    background-image: url(${backpackResetHovered});
  }

  &:active {
    background-image: url(${backpackResetClicked});
  }
  
  ${props => props.$isDemo ? 
          `&:focus {
              outline: 2px solid red;
              border-radius: 5px;
          }`
          : ''
  }
`;

export default StyledCompleteResetButton;