import styles from './TransportationList.module.scss';

import {useSelector} from "react-redux";
import {selectTransportation} from "../../../store/transportation/transportation-selectors";
import {useGetTransportationsDataQuery} from "../../../store/api/api";
import {selectLanguage} from "../../../store/language/language-selector";
import TransportationItem from "./TransportationItem/TransportationItem";

import {PacmanLoader} from "react-spinners";

const TransportationList = () => {

    const {selectedLanguage, language} = useSelector(selectLanguage);
    const {transportationListStrings} = language;
    const isSelectedRu = selectedLanguage === 'ru';

    const {from, to, count, skip, serverId, profitSort, checkSort} = useSelector(selectTransportation);

    const {
        isFetching,
        isError,
        data,
    } = useGetTransportationsDataQuery({from, to, skip, serverId, count, profitSort, checkSort}, {
        refetchOnReconnect: true,
    });

    return (
        <div className={styles.tableStyles}>
            {!isFetching && !isError &&
                <table>
                    <thead>
                    <tr>
                        <th>{transportationListStrings.item}</th>
                        <th>{transportationListStrings.itemName}</th>
                        <th>{isSelectedRu ? `Цена ${from}` : `${from} price`}</th>
                        <th>{isSelectedRu ? `Цена ${to}` : `${to} price`}</th>
                        <th title={transportationListStrings.excludingTax}>{transportationListStrings.profit}
                            <svg
                                version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 496.304 496.303"
                                xmlSpace="preserve">
                                <g>
                                    <path
                                        d="M248.146,0C111.314,0,0,111.321,0,248.152c0,136.829,111.314,248.151,248.146,248.151 c136.835,0,248.158-111.322,248.158-248.151C496.304,111.321,384.98,0,248.146,0z M248.146,472.093 c-123.473,0-223.935-100.459-223.935-223.941c0-123.479,100.462-223.941,223.935-223.941 c123.488,0,223.947,100.462,223.947,223.941C472.093,371.634,371.634,472.093,248.146,472.093z M319.536,383.42v32.852 c0,1.383-1.123,2.494-2.482,2.494H196.45c-1.374,0-2.482-1.117-2.482-2.494V383.42c0-1.372,1.114-2.482,2.482-2.482h34.744V205.831 h-35.101c-1.375,0-2.468-1.111-2.468-2.474v-33.6c0-1.38,1.1-2.479,2.468-2.479h82.293c1.371,0,2.482,1.105,2.482,2.479v211.181 h36.186C318.413,380.938,319.536,382.048,319.536,383.42z M209.93,105.927c0-20.895,16.929-37.829,37.829-37.829 c20.886,0,37.826,16.935,37.826,37.829s-16.94,37.829-37.826,37.829C226.853,143.756,209.93,126.822,209.93,105.927z"/>
                                </g>
                            </svg>

                        </th>
                        <th>{transportationListStrings.percentageProfit}</th>
                        <th>{transportationListStrings.dailyTurnover}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {!isFetching && !isError && !!data &&
                        data.map(({to, from}) =>
                            <TransportationItem
                                key={to.itemId}
                                from={from}
                                to={to}
                            />
                        )
                    }
                    </tbody>
                </table>}
            {!!isFetching &&
                <PacmanLoader
                    className={styles.spinnerStyles}
                    color={"rgb(235, 198, 159)"}
                    loading={isFetching}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />}
            {!!isError && <div className={styles.errorStyles}>{transportationListStrings.requestError}</div>}
        </div>
    )
}

export default TransportationList;