import styled from 'styled-components';

interface IStyledWorkBenchButtonProps{
    $left: number;
    $top: number;
    $buttonImg: string;
    $hoverImg: string;
    $isSelected: boolean;

}

const StyledWorkBenchButton = styled.button<IStyledWorkBenchButtonProps>`
  position: absolute;
  left: ${props => `${props.$left - (!props.$isSelected ? 5 : 0)}px`};
  top: ${props => `${props.$top}px`};
  background-color: transparent;
  border: none;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  z-index: ${props => !!props.$isSelected ? 2 : 0};
  filter: drop-shadow(3px 3px 6px black);

  width: 64px;
  height: 85px;
  background-image: ${props => props.$isSelected ? `url(${props.$hoverImg})` : `url(${props.$buttonImg})`};
  
  &:hover{
    ${props => `background-image: url(${props.$hoverImg})`};
  }
`;

export default StyledWorkBenchButton;
