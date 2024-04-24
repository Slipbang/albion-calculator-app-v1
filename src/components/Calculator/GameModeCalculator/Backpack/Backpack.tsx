import {memo} from "react";

import StyledBackpack from "./BackpackSC/StyledBackpack";
import SilverIcon from "./SilverIcon/SilverIcon";
import BackpackItems from "./BackpackItems/BackpackItems";
import BackpackButtonsBox from "./BackpackButtonsBox/BackpackButtonsBox";

const Backpack = memo(() => {

    return (
        <StyledBackpack draggable={false}>
            <BackpackItems />

            <SilverIcon />

            <BackpackButtonsBox />
        </StyledBackpack>
    )
})

export default Backpack;
