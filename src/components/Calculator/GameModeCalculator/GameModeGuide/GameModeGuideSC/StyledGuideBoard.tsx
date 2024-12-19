import styled from "styled-components";
import {guideBoard} from "../GameModeGuideIngReexports/GameMogeGuideImgReexports";


const StyledGuideBoard = styled.div`
  height: 597px;
  width: 352px;
  background-color: rgb(242,190,147);
  z-index: 3;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${guideBoard});
  filter: drop-shadow(3px 3px 6px black);

  p {
    position: absolute;
    left: 20px;
    top: 100px;
    width: 310px;
    height: 430px;
  }

  button:last-child {
    position: absolute;
    bottom: 25px;
    right: 25px;
    font-size: 16px;
  }
`;

export default StyledGuideBoard;