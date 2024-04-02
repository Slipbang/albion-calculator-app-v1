import styled from 'styled-components';
import {marketSelector} from "../MarketMenuImgReexports/MarketMenuImgReexports";

const StyledMarketSelector = styled.div`
  z-index: 9999;
  position: fixed;
  top: 110px;
  left: 10px;

  width: 400px;
  height: 22px;
  
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(${marketSelector});
  filter: drop-shadow(3px 3px 6px black);

  p {
    font-size: 13px;
    line-height: 10px;
    padding-left: 7px;
  }

  .selectTierStyle:hover{
    border-color: white;
  }
`

export default StyledMarketSelector;