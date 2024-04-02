import styled from 'styled-components';
import {calculatorFormSelector} from "../../DefaultCalculatorImgReexports/DefaultCalculatorImgReexports";


const StyledCalculatorFormSelector  = styled.div`
  margin-left: 10px;
  width: 128px;
  height: 27px;
  
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(${calculatorFormSelector});
  filter: drop-shadow(3px 3px 6px black);

  input[type='number']{
    position: absolute;
    top: 5px;
    left: 4px;
    width: 99px;
    border-radius: 10px;
    height: 17px;
    background-color: rgb(242,190,147);
    appearance: none;
    outline: none;
    border: none;
    caret-color: white;
    padding-left: 10px;
    padding-right: 10px;
  }


  input[type='number']::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`

export default StyledCalculatorFormSelector;