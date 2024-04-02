import styled from "styled-components";
import {backpackReset, backpackResetClicked, backpackResetHovered} from "../GameModeCalculator/Backpack/BackpackImgReexports/BackpackImgReexports";

const StyledCompleteResetButton = styled.button`
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
`;

export default StyledCompleteResetButton;