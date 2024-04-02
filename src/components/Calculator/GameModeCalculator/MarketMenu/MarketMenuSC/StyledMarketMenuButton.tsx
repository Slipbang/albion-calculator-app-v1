import styled from 'styled-components';
import {marketMenuCloseButton, marketMenuOpenButton, marketMenuOpenButtonHovered, marketMenuCloseButtonHovered} from "../MarketMenuImgReexports/MarketMenuImgReexports";

interface IStyledMarketMenuProps {
    $isMarketMenuShown: boolean;
}

const StyledMarketMenuButton = styled.button<IStyledMarketMenuProps>`
  background-color: transparent;
  border: none;
  width: 29px;
  height: 36px;
  background-image: ${props => props.$isMarketMenuShown ? `url(${marketMenuCloseButton})` : `url(${marketMenuOpenButton})`};
  position: absolute;
  
  &:hover{
    background-image: ${props => props.$isMarketMenuShown ? `url(${marketMenuCloseButtonHovered})` : `url(${marketMenuOpenButtonHovered})`};
  }
  
  filter: drop-shadow(3px 3px 6px black);

  
  top: 1rem;
  left: -23px;
  cursor: pointer;
  z-index: 9991;
  
  
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

export default StyledMarketMenuButton;