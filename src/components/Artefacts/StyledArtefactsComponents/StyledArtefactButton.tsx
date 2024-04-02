import styled from 'styled-components';

interface IStyledArtefactButtonProps {
    $image: string;
    $selectedImage: string;
    $hoveredImage: string;
    $isSelected: boolean;
}

const StyledArtefactButton = styled.button<IStyledArtefactButtonProps>`
  width: ${props => props.$isSelected ? 51 : 45}px;
  height:${props => props.$isSelected ? 73 : 45}px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  z-index: 5;
  
  background-image: ${props => `url(${props.$isSelected ? props.$selectedImage : props.$image})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  
  &:hover{
    ${props => !props.$isSelected ? `background-image: url(${props.$hoveredImage})` : ''}
  }
`

export default StyledArtefactButton;