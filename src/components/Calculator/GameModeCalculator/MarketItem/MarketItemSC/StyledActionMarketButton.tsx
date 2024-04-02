import styled from "styled-components";
import {
    actionButton,
    actionButtonHovered,
    selectedActionButton,
    selectedActionButtonHovered
} from "../MarketItemImgReexports/MarketItemImgReexports";


interface IStyledActionMarketButtonProps{
    $isButtonSelected: boolean;
}

const StyledActionMarketButton = styled.button<IStyledActionMarketButtonProps>`
  margin-right: 15px;
  background-color: transparent;
  border: none;
  background-image: ${props => props.$isButtonSelected ? `url(${selectedActionButton})` : `url(${actionButton})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 22px;
  height: 21px;
  cursor: pointer;
  
  &:hover{
    background-image: ${props => props.$isButtonSelected ? `url(${selectedActionButtonHovered})` : `url(${actionButtonHovered})`};
  }
  
`;

export default StyledActionMarketButton;