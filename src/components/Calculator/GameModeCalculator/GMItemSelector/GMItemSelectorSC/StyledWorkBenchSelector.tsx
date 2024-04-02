import styled from 'styled-components';
import {selectCraftItems} from "../GMItemSelectorImgReexports/GMItemSelectorImgReexports";

const StyledWorkBenchSelector  = styled.div`
  position: absolute;
  top: 263px;
  width: 280px;
  height: 22px;
  z-index: 5;
  left: 30px;
  
  
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${selectCraftItems});
  filter: drop-shadow(3px 3px 6px black);
`

export default StyledWorkBenchSelector;