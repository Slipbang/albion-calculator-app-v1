import styled from 'styled-components';

interface IStyledBackpackButtonProps {
    $image: string;
    $clickedImage: string;
    $hoveredImage: string;
}

const StyledBackpackButton = styled.button<IStyledBackpackButtonProps>`
  background-color: transparent;
  border: none;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  z-index: 9999;
  width: 71px;
  height: 25px;
  filter: drop-shadow(1px 1px 2px black);
  background-image: ${props => `url(${props.$image})`};
  
  &:hover{
    background-image: ${props => `url(${props.$hoveredImage})`};
  }

  &:active{
    background-image: ${props => `url(${props.$clickedImage})`};
  }
`

export default StyledBackpackButton;