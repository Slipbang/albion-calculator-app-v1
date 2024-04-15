import React, {ChangeEventHandler} from "react";
import {artefactActions, TArtefactsTier} from "../../../store/artefacts/artefact-slice";
import {useSelector} from "react-redux";
import {selectArtefactsTier} from "../../../store/artefacts/artefact-selectors";
import {useAppDispatch} from "../../../store";
//import {useNavigate, useParams} from "react-router-dom";

const TierSelector = () => {
    const dispatchAction = useAppDispatch();

    const selectedTier = useSelector(selectArtefactsTier);

    // const {artefactClass, artefactType, artefactTier} = useParams<'artefactClass' | 'artefactType' | 'artefactTier'>();
    // const navigate = useNavigate();

    // useEffect(() => {
    //     dispatchAction(artefactActions.setArtefactsTier(artefactTier as TArtefactsTier));
    // }, [artefactTier])

    const selectArtefactsTierHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
        dispatchAction(artefactActions.setArtefactsTier(event.target.value as TArtefactsTier));
        //navigate(`/${selectedLanguage}/artefacts/${artefactClass}/${artefactType}/${event.target.value}`)
    }

    return (
        <select value={selectedTier} id="artefactTierSelect"
                onChange={(event) => selectArtefactsTierHandler(event)}>
            <option value='T4'>T4</option>
            <option value='T5'>T5</option>
            <option value='T6'>T6</option>
            <option value='T7'>T7</option>
            <option value='T8'>T8</option>
        </select>
    )
}

export default TierSelector;