import {memo} from "react";


import SilverIcon from "./SilverIcon/SilverIcon";
import BackpackItems from "./BackpackItems/BackpackItems";
import BackpackButtonsBox from "./BackpackButtonsBox/BackpackButtonsBox";
import StyledBackpackWrapper from "./BackpackSC/StyledBackpackWrapper";

const Backpack = memo(() => {

    return (
        <StyledBackpackWrapper draggable={false}>
            <BackpackItems />

            <SilverIcon />

            <BackpackButtonsBox />
        </StyledBackpackWrapper>
    )
})

export default Backpack;
