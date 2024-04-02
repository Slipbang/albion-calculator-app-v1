import styled from "styled-components";

interface IStyledEnchantmentButtonsProps{
    $isSelected: boolean;
    $enchantmentButton: string;
    $hoveredEnchantmentButton: string;
    $selectedEnchantmentButton: string;
    $hoveredActiveEnchantmentButton: string;
}

const StyledEnchantmentButton = styled.button<IStyledEnchantmentButtonsProps>`
  margin-right: 10px;
  background-color: transparent;
  border: none;
  background-image: ${props => props.$isSelected ? `url(${props.$selectedEnchantmentButton})` : `url(${props.$enchantmentButton})`} ;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 38px;
  height: 37px;
  filter: drop-shadow(3px 3px 6px black);
  cursor: pointer;

  &:hover {
    background-image: ${props => props.$isSelected ? `url(${props.$hoveredActiveEnchantmentButton})` : `url(${props.$hoveredEnchantmentButton})`};
  }
`;

export default StyledEnchantmentButton;