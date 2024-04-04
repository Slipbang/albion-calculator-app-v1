import {useSelector} from "react-redux";
import {
    selectArtefacts,
    selectArtefactsClass,
    selectArtefactsSort,
    selectArtefactsTier,
    selectArtefactsType
} from "../../../store/artefacts/artefact-selectors";
import {TClass} from "../../../types/artefactTypes";
import {TArtefactData} from "../../../types/artefactTypes";
import {artefactsClassesKeys} from "../../../store/artefacts/artefact-slice";
import {useGetItemsDataQuery} from "../../../store/api/api";
import {selectServerId} from "../../../store/queryParams/query-params-selectors";

const useArtefacts = () => {
    const artefacts = useSelector(selectArtefacts);
    const selectedType = useSelector(selectArtefactsType);
    const selectedClass = useSelector(selectArtefactsClass);
    const selectedTier = useSelector(selectArtefactsTier);
    const selectedSort = useSelector(selectArtefactsSort);
    const serverId = useSelector(selectServerId)

    const artefactsValidation = (classKey: TClass) => {
        if (selectedClass === 'allClasses') return true;

        return classKey === selectedClass;
    }

    const calcArt = () => {
        const artefactsToRender: TArtefactData[] = [];
        let artefactsQueryParams = '';

        artefactsClassesKeys
            .forEach(classKey => artefacts[classKey as TClass][selectedType]
                .forEach(artefact => {
                    if (artefactsValidation(classKey)) {
                        artefactsToRender.push(artefact);
                        artefactsQueryParams += `${selectedTier}_${artefact.artefactId},`;
                    }
                }));

        return {artefactsToRender, artefactsQueryParams}
    }

    const {artefactsToRender, artefactsQueryParams} = calcArt();


    const {
        isFetching: isArtefactsFetching,
        isError: isErrorArtefacts,
        data: artefactsPriceData,
        refetch: reFetchFunction,
    } = useGetItemsDataQuery({itemsParams: artefactsQueryParams, isBlackMarket: false, serverId}, {
        refetchOnReconnect: true,
    });

    return {
        reFetchFunction,
        artefactsToRender,
        isArtefactsFetching,
        isErrorArtefacts,
        artefactsPriceData,
        selectedTier,
        selectedSort,
    }
}

export {useArtefacts}