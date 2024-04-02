import styled from "styled-components";
import {increasePriceButtonClicked, increasePriceButtonHovered} from "../MarketItemImgReexports/MarketItemImgReexports";

const StyledIncreasePriceButton = styled.button`
  
  position: absolute;
  background-color: transparent;
  border: none;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  z-index: 9999;
  margin-left: 215px;
  margin-top: 4px;

  width: 19px;
  height: 19px;
  
  &:hover{
    background-image: url(${increasePriceButtonHovered});
  }
  
  &:active{
    background-image: url(${increasePriceButtonClicked});
  }
`;

export default StyledIncreasePriceButton;