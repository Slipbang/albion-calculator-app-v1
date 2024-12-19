import styled from "styled-components";
import {
    clickedCraftingButton,
    craftingButton,
    hoveredCraftingButton,
    nonActiveCraftingButton,
    clickedCraftingButtonEn,
    craftingButtonEn,
    hoveredCraftingButtonEn,
    nonActiveCraftingButtonEn,
} from "../CraftingFormImgReexports/CraftingFormImgReexports";


interface IStyledCraftingButtonProps{
    $isRuSelected: boolean;
}

const StyledCraftingButton = styled.button<IStyledCraftingButtonProps>`
  background-color: transparent;
  border: none;
  background-image: ${props => `url(${props.$isRuSelected ? craftingButton : craftingButtonEn});`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 108px;
  height: 36px;
  filter: drop-shadow(3px 3px 6px black);
  cursor: pointer;
  position: fixed;
  bottom: 58px;
  right: 45px;
  
  &:disabled {
    background-image: ${props => `url(${props.$isRuSelected ? nonActiveCraftingButton : nonActiveCraftingButtonEn});`};
  }
  
  &:hover:not(:disabled) {
    background-image: ${props => `url(${props.$isRuSelected ? hoveredCraftingButton : hoveredCraftingButtonEn});`}
  }

  &:active:not(:disabled) {
    background-image: ${props => `url(${props.$isRuSelected ? clickedCraftingButton : clickedCraftingButtonEn});`};
  }

  &:focus {
    outline: 2px solid red; 
    border-radius: 5px;
  }
`;

export default StyledCraftingButton;