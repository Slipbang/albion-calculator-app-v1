import styled from 'styled-components';
import {backpackCell} from "../BackpackImgReexports/BackpackImgReexports";

const StyledBackpackCell = styled.div`
  position: initial;
  width: 72px;
  height: 70px;
  margin: 8px;
  filter: none;
  background-image: url(${backpackCell});

  z-index: 9997;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

export default StyledBackpackCell;