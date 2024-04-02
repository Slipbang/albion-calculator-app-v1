import styled from 'styled-components';
import {defaultCalculator} from "../../DefaultCalculatorImgReexports/DefaultCalculatorImgReexports";

const StyledCalculatorFormWrapper = styled.div`
  user-select: none;
  z-index: 5;
  position: absolute;  
  width: 522px;
  height: 522px;
  background-color: rgb(242,190,147);
  filter: drop-shadow(3px 3px 6px black);
  border-radius: 29px;
  
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${defaultCalculator});
`

export default StyledCalculatorFormWrapper;