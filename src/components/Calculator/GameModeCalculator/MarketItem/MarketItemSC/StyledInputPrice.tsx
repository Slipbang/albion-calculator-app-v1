import styled from "styled-components";
import {inputPrice} from "../MarketItemImgReexports/MarketItemImgReexports";

const StyledInputPrice = styled.div`
  background-image: url(${inputPrice});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  
  width: 239px;
  height: 27px;
  
  input[type='number']{
    background-color: rgb(242, 190, 147);
    width: 139px;
    margin-left: 45px;
    margin-top: 3px;
    border-radius: 20px;
    height: 16px;
    outline: none;
    padding-left: 20px;
  }

  input[type='number']::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`;

export default StyledInputPrice;