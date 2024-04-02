import styled from "styled-components";
import {selectedItem} from "../CraftingFormImgReexports/CraftingFormImgReexports";

const StyledCraftingForm = styled.div`
  height: 463px;
  width: 460px;
  position: absolute;
  transform: translate(-50%, -50%);
  background-color: rgb(242,190,147);
  border-radius: 25px;
  z-index: 3;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${selectedItem});
  filter: drop-shadow(3px 3px 6px black);
`;

export default StyledCraftingForm;