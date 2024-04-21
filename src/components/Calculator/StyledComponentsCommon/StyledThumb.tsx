import styled from 'styled-components';
import {scrollbarArrowUp, scrollbarArrowDown, scrollbarBody, scrollbarTrack} from "../CommonImgReexports/CommonImgReexports";

const StyledThumb = styled.div`
  z-index: 9999;
  ::-webkit-scrollbar-thumb:vertical {
    appearance: none;
    background-image: url(${scrollbarArrowUp}), url(${scrollbarBody}), url(${scrollbarArrowDown});
    background-size: 15px 29px, 9px calc(100% - 55px), 15px 29px;
    background-repeat: no-repeat, no-repeat, no-repeat;
    background-position: top, center, bottom;
    height: 100px;
  }

  ::-webkit-scrollbar {
    background-color: transparent;
  }

  ::-webkit-scrollbar:horizontal {
    height: 7px;
    max-width: 50px;
  }

  ::-webkit-scrollbar-track:vertical {
    background-image: url(${scrollbarTrack});
    background-repeat: no-repeat;
    background-size: 15px 100%;
  }
  
  ::-webkit-scrollbar-thumb:horizontal {
    background-color: rgb(91, 64, 45);
    border-radius: 10px;
  }
`;

export default StyledThumb;