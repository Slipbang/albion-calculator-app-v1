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
    $isActive: boolean;
    $isRuSelected: boolean;
}

const StyledCraftingButton = styled.button<IStyledCraftingButtonProps>`
  background-color: transparent;
  border: none;
  background-image: ${props => props.$isActive ? `url(${props.$isRuSelected ? craftingButton : craftingButtonEn});` : `url(${props.$isRuSelected ? nonActiveCraftingButton : nonActiveCraftingButtonEn});`};
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

  &:hover {
    ${props => props.$isActive ? `background-image: url(${props.$isRuSelected ? hoveredCraftingButton : hoveredCraftingButtonEn});` : ''}
  }

  &:active {
    ${props => props.$isActive ? `background-image: url(${props.$isRuSelected ? clickedCraftingButton : clickedCraftingButtonEn});` : ''}
  }
`;

export default StyledCraftingButton;