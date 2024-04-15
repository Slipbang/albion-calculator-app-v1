import {useSelector} from "react-redux";
import {
    selectArtefacts,
    selectArtefactsClass,
    selectArtefactsSort,
    selectArtefactsTier,
    selectArtefactsType
} from "../../../store/artefacts/artefact-selectors";
import {TArtefactClass} from "../../../types/artefactTypes";
import {TArtefactData} from "../../../types/artefactTypes";
import {artefactActions, artefactsClassesKeys} from "../../../store/artefacts/artefact-slice";
import {useCallback, useEffect, useMemo} from "react";
import {useAppDispatch} from "../../../store";

const useArtefacts = () => {

    const dispatchAction = useAppDispatch();

    const artefacts = useSelector(selectArtefacts);
    const selectedType = useSelector(selectArtefactsType);
    const selectedClass = useSelector(selectArtefactsClass);
    const selectedTier = useSelector(selectArtefactsTier);
    const selectedSort = useSelector(selectArtefactsSort);

    const artefactsValidation = useCallback((classKey: TArtefactClass) => {
        if (selectedClass === 'allClasses') return true;

        return classKey === selectedClass;
    },[selectedClass])

    const buildArtefactsTree = useMemo(() => {
        const artefactsToRender: TArtefactData[] = [];
        let artefactsQueryParams: string[] = [];

        artefactsClassesKeys
            .forEach(classKey => artefacts[classKey as TArtefactClass][selectedType]
                .forEach(artefact => {

                    if (artefactsValidation(classKey)) {
                        artefactsToRender.push(artefact);
                        artefactsQueryParams.push(`${selectedTier}_${artefact.artefactId}`);
                    }
                }));

        return {artefactsToRender, artefactsQueryParams: artefactsQueryParams.join(',')}
    },[selectedType, selectedTier, artefacts, artefactsValidation]);

    const {artefactsToRender, artefactsQueryParams} = buildArtefactsTree;

    useEffect(() => {
        dispatchAction(artefactActions.setArtefactsParams(artefactsQueryParams))
    }, [artefactsQueryParams])

    return {
        artefactsToRender,
        selectedTier,
        selectedSort,
    }
}

export {useArtefacts}