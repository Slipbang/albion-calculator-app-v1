import StyledWorkBenchSelector from "../GMItemSelectorSC/StyledWorkBenchSelector";
import TierSelector from "./TierSelector/TierSelector";
import NodeSelector from "./NodeSelector/NodeSelector";
import ResetButton from "./ResetButton/ResetButton";
import React from "react";

const WorkBenchSelectors = () => {

    return <StyledWorkBenchSelector>
        <TierSelector />

        <NodeSelector />

        <ResetButton />
    </StyledWorkBenchSelector>
}

export default WorkBenchSelectors;