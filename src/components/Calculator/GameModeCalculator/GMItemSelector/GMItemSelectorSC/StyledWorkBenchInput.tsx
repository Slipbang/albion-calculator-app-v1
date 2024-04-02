import styled from 'styled-components';
import {inputCraftItems} from "../GMItemSelectorImgReexports/GMItemSelectorImgReexports";


const StyledWorkBenchInput  = styled.div`
  position: absolute;
  top: 232px;
  width: 280px;
  height: 23px;
  z-index: 5;
  left: 30px;
  
  
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(${inputCraftItems});
  filter: drop-shadow(3px 3px 6px black);
`

export default StyledWorkBenchInput;