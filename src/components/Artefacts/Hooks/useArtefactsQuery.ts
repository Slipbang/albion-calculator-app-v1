import {useGetItemsDataQuery} from "../../../store/api/api";
import {useSelector} from "react-redux";
import {selectArtefactsParams} from "../../../store/artefacts/artefact-selectors";
import {selectServerId} from "../../../store/queryParams/query-params-selectors";

const useArtefactsQuery = () => {

    const artefactsQueryParams = useSelector(selectArtefactsParams);
    const serverId = useSelector(selectServerId);

    const {
        isFetching: isArtefactsFetching,
        isError: isErrorArtefacts,
        data: artefactsPriceData,
        refetch: reFetchFunction,
    } = useGetItemsDataQuery({itemsParams: artefactsQueryParams, isBlackMarket: false, serverId}, {
        refetchOnReconnect: true,
    });

    return {isArtefactsFetching, isErrorArtefacts, artefactsPriceData, reFetchFunction};
}

export {useArtefactsQuery}