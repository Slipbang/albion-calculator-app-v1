import styled from "styled-components";
import {informationIcon, informationIconHovered} from "../../../CommonImgReexports/CommonImgReexports";


const StyledInfoIcon = styled.div`
  background-image: url(${informationIcon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 23px;
  height: 22px;
  margin-left: 10px;
  cursor: pointer;
  
  &:hover{
    background-image: url(${informationIconHovered});
  }
`
export default StyledInfoIcon;