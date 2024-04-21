import styled from 'styled-components';
import {tableItems} from "../../DefaultCalculatorImgReexports/DefaultCalculatorImgReexports";

const StyledCalculatorFormWrapper = styled.div`
  width: 531px;
  height: 495px;
  user-select: none;
  z-index: 4;
  position: absolute;
  top: 10px;
  left: 10px;
  padding-top: 10px;
  transition: all 0.5s ease-in-out;
  background-color: rgb(242,190,147);
  filter: drop-shadow(3px 3px 6px black);
  
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${tableItems});
`

export default StyledCalculatorFormWrapper;