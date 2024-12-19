import styled from 'styled-components';
import {marketItem} from "../MarketItemImgReexports/MarketItemImgReexports";

interface IStyledMarketItem {
    $noPointersEvents: boolean;
}

const StyledMarketItem = styled.div<IStyledMarketItem>`
  user-select: none;
  position: absolute;
  left: calc(50% - ${props => props.$noPointersEvents ? '120px' : '0'});
  top: 50%;
  transform: translate(-50%,-50%);
  border: none;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 5;
  background-color: rgb(242,190,147);
  ${props => props.$noPointersEvents ? 'pointer-events: none;' : ''}

  background-image: url(${marketItem});

  height: 495px;
  width: 531px;  
  
  p {
    font-weight: 700;
    color: rgb(89,60,40);
  }
`

export default StyledMarketItem;