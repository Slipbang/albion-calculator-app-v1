import styled from "styled-components";

interface StyledWorkBenchTypeButtonProps{
    $buttonImage: string;
    $selectedButtonImage: string;
    $isSelected: boolean;
    $isSelectorShown: boolean;
}

const StyledWorkBenchTypeButton = styled.button<StyledWorkBenchTypeButtonProps>`;
  z-index: ${props => props.$isSelected ? 9999 : 9990};
  background-color: transparent;
  border: none;
  background-image: ${props => props.$isSelected ? `url(${props.$selectedButtonImage})` : `url(${props.$buttonImage})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 45px;
  height: 45px;
  ${props => props.$isSelected || props.$isSelectorShown ? `filter: drop-shadow(3px 3px 3px black);` : ''}
  cursor: pointer;
  
  &:hover{
    scale: 1.1;
    background-image: ${props => `url(${props.$selectedButtonImage})`};
  }  
  
  &:active{
    scale: 1.2;
  }
`;

export default StyledWorkBenchTypeButton;