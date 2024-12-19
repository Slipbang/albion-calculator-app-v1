import styled from "styled-components";
import {ownPriceButton,ownPriceButtonActive,ownPriceButtonHovered,ownPriceButtonActiveHovered} from "../CommonImgReexports/CommonImgReexports";

interface IStyledOwnPriceButtonProps{
    $isDemo?: boolean;
    $isSelected: boolean;
}

const StyledCustomCheckButton = styled.button<IStyledOwnPriceButtonProps>`
  margin-right: 5px;
  background-color: transparent;
  border: none;
  background-image: ${props => props.$isSelected ? `url(${ownPriceButtonActive})` : `url(${ownPriceButton})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 25px;
  height: 25px;
  filter: drop-shadow(1px 1px 1px black);
  cursor: pointer;

  &:hover {
    background-image: ${props => props.$isSelected ? `url(${ownPriceButtonActiveHovered})` : `url(${ownPriceButtonHovered})`};
  }  
  
  &:active{
    background-image: ${props => props.$isSelected ? `url(${ownPriceButtonActive})` : `url(${ownPriceButton})`};
  }

  ${props => props.$isDemo ?
          `&:focus {
              outline: 2px solid red;
              border-radius: 5px;
          }`
          : ''
  }
`;

export default StyledCustomCheckButton;