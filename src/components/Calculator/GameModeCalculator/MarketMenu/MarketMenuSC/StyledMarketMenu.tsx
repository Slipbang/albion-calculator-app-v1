import styled from 'styled-components';
import {marketList} from "../MarketMenuImgReexports/MarketMenuImgReexports";

const StyledMarketMenu = styled.div`
  width: 427px;
  height: 547px;
  filter: drop-shadow(3px 3px 6px black);
  background-color: rgb(242,190,147);

  background-image: url(${marketList});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  
  svg {
    position: absolute;
    width: 75px;
    margin-left: -70px;
    margin-top: 28px;
    z-index: 5;
    fill: var(--color-svg);
    transform: rotate(35deg);
    
    transition: 0.5s ease all;
  }
`

export default StyledMarketMenu;