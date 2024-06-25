import styled from 'styled-components';

interface IStyledBackpackButtonProps {
    $image: string;
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
  width: 86px;
  height: 20px;
  filter: drop-shadow(1px 1px 2px black);
  background-image: ${props => `url(${props.$image})`};
  color: rgb(96, 67, 47);
  font-weight: 600;
  
  &:hover{
    background-image: ${props => `url(${props.$hoveredImage})`};
    color: wheat;
  }
  
`

export default StyledBackpackButton;