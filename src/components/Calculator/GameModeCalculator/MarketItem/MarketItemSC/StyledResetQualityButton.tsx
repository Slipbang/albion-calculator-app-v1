import styled from "styled-components";
import {
    resetQualityButton,
    resetQualityButtonHovered,
    resetQualityButtonPressed
} from "../MarketItemImgReexports/MarketItemImgReexports";


const StyledResetQualityButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 19px;
  height: 19px;
  z-index: 9999;
  background-color: transparent;
  border: none;
  background-image: url(${resetQualityButton});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;

  &:hover {
    background-image: url(${resetQualityButtonHovered});
  }
  
  &:active {
    background-image: url(${resetQualityButtonPressed});
  }
`;

export default StyledResetQualityButton;