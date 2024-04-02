import styled from "styled-components";
import {inputThumb} from "../CommonImgReexports/CommonImgReexports";


interface IStyledInputRangeProps{
    $inputImage: string;
    $width: number;
    $height: number;
}

const StyledInputRange = styled.input.attrs({type: 'range',})<IStyledInputRangeProps>`
  z-index: 9998;
  -webkit-appearance: none;
  height: ${props => `${props.$height}px`};
  width: ${props => `${props.$width}px`};
  background-color: transparent;
  background-image: ${props => `url(${props.$inputImage})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  outline: none;
  margin-left: -1px;
  
  &::-webkit-slider-runnable-track{
    margin: 0 -7px;
  }
  
  
  
  &::-webkit-slider-thumb {
    z-index: 9999;
    background-size: contain;
    -webkit-appearance: none;
    appearance: none;
    width: 39px;
    height: 34px;
    background: url(${inputThumb}) center center no-repeat;
    background-size: cover;
    cursor: pointer;
    margin-bottom: 30px;
  }


`

export default StyledInputRange;
