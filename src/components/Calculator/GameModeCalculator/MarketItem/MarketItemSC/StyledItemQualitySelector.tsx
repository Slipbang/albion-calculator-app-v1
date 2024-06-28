import styled from "styled-components";
import {itemQualitySelector} from "../MarketItemImgReexports/MarketItemImgReexports";

const StyledItemQualitySelector = styled.div`
  z-index: 9999;
  position: absolute;
  top: 110px;
  left: 20px;

  width: 489px;
  height: 27px;
  
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(${itemQualitySelector});

  p {
    font-size: 13px;
    line-height: 10px;
    padding-left: 7px;
  }

  .selectTierStyle:hover{
    border-color: white;
  }
`

export default StyledItemQualitySelector;