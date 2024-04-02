import styled from 'styled-components';
import {marketItem} from "../MarketItemImgReexports/MarketItemImgReexports";

const StyledMarketItem = styled.div`
  user-select: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border: none;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 4;
  background-color: rgb(242,190,147);

  background-image: url(${marketItem});

  height: 495px;
  width: 531px;  
  
  
  p{
    font-weight: 700;
    color: rgb(89,60,40);
  }
`

export default StyledMarketItem;