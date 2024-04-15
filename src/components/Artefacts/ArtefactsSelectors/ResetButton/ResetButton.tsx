import StyledCompleteResetButton from "../../../Calculator/StyledComponentsCommon/StyledСompleteResetButton";
import React from "react";
import {useArtefactsQuery} from "../../Hooks/useArtefactsQuery";

const ResetButton = () => {

    const {reFetchFunction} = useArtefactsQuery();

    const fetchArtefactsHandler = () => {
        reFetchFunction();
    }

    return (
        <StyledCompleteResetButton
            onClick={() => fetchArtefactsHandler()}
        />
    )
}

export default ResetButton;