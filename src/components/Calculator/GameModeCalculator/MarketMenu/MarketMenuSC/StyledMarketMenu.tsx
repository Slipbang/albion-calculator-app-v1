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
`

export default StyledMarketMenu;