import styled from 'styled-components';
import {workbench} from "../GMItemSelectorImgReexports/GMItemSelectorImgReexports";

const StyledWorkBench = styled.div`
  width: 334px;
  height: 847px;
  filter: drop-shadow(3px 3px 6px black);
  z-index: 2;
  background-color: rgb(242,190,147);

  background-image: url(${workbench});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

}
`

export default StyledWorkBench;