import styled from 'styled-components';
import {backpackSilver, backpackSilverHovered} from "../BackpackImgReexports/BackpackImgReexports";


const StyledBackpackSilverIcon = styled.div`
  width: 27px;
  height: 26px;
  background-image: url(${backpackSilver});

  z-index: 9997;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: drop-shadow(1px 1px 2px black);
  cursor: pointer;
  
  &:hover{
    background-image: url(${backpackSilverHovered});
  }
`

export default StyledBackpackSilverIcon;