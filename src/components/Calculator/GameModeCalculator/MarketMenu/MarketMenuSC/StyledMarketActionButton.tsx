import styled from "styled-components";
import {
    buyButton,
    hoveredBuyButton,
    activeBuyButton,
    sellButton,
    sellButtonHovered,
    clickedSellButton,
    buyButtonEn,
    hoveredBuyButtonEn,
    activeBuyButtonEn,
    sellButtonEn,
    sellButtonHoveredEn,
    clickedSellButtonEn,

} from "../MarketMenuImgReexports/MarketMenuImgReexports";

interface IStyledMarketActionButtonProps{
    $isActionBuy: boolean;
    $isRuSelected: boolean;
}

const StyledMarketActionButton = styled.button<IStyledMarketActionButtonProps>`
  margin-right: 15px;
  background-color: transparent;
  border: none;
  background-image: ${props => props.$isActionBuy ? `url(${props.$isRuSelected ? buyButton : buyButtonEn}` : `url(${props.$isRuSelected ? sellButton: sellButtonEn}`});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 108px;
  height: 36px;
  filter: drop-shadow(3px 3px 6px black);
  cursor: pointer;

  &:hover {
    background-image: ${props => props.$isActionBuy ? `url(${props.$isRuSelected ? hoveredBuyButton : hoveredBuyButtonEn}` : `url(${props.$isRuSelected ? sellButtonHovered : sellButtonHoveredEn}`});
  }

  &:active {
    background-image: ${props => props.$isActionBuy ? `url(${props.$isRuSelected ? activeBuyButton : activeBuyButtonEn}` : `url(${props.$isRuSelected ? clickedSellButton : clickedSellButtonEn}`});
  }
`;

export default StyledMarketActionButton;