import styled from 'styled-components';
import {backpack} from "../BackpackImgReexports/BackpackImgReexports";

const StyledBackpack = styled.div`
  user-select: none;
  position: absolute;
  bottom: 15px;
  right: 15px;
  z-index: 1;
  width: 432px;
  height: 569px;
  filter: drop-shadow(3px 3px 6px black);
  background-color: rgb(242,190,147);
  
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${backpack});
`

export default StyledBackpack;