import {ChangeEventHandler} from "react";

import styles from "./TransportationForm.module.scss";

import {useAppDispatch} from "../../../store";
import {queryParamsSliceActions} from "../../../store/queryParams/queryParamsSlice";
import {useSelector} from "react-redux";
import {selectLanguage} from "../../../store/language/language-selector";
import {cityOptions} from "../../../store/Options/CityOptions";
import {selectTransportationQueryParams} from "../../../store/queryParams/query-params-selectors";
import {TSortCheckParams, TSortProfitParams} from "../../../store/api/api";
import {selectThemeState} from "../../../store/interface/interface-selector";

const TransportationForm = () => {
    const {from, to, profitSort} = useSelector(selectTransportationQueryParams);
    const dispatchAction = useAppDispatch();

    const isDark = useSelector(selectThemeState);

    const {language} = useSelector(selectLanguage);
    const {transportationFormStrings} = language;

    const selectFromHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
        dispatchAction(queryParamsSliceActions.setCityFrom(event.target.value));
    };

    const selectToHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
        dispatchAction(queryParamsSliceActions.setCityTo(event.target.value));
    };

    const selectSortHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
        dispatchAction(queryParamsSliceActions.setProfitSort(event.target.value as TSortProfitParams))
    };

    const checkByTimeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
        const checkSort = (event.target.checked ? event.target.value : '') as TSortCheckParams;
        dispatchAction(queryParamsSliceActions.setCheckSort(checkSort));
    }

    return (
        <div className={styles.transportationFormStyles} data-theme={isDark ? 'dark' : 'light'}>
            <div>
                <p>{transportationFormStrings.sortByLastChecked}</p>
                <input
                    type="checkbox"
                    value='BY_LAST_TIME_CHECKED,'
                    id='byTimeChecked'
                    defaultChecked={true}
                    onChange={(event) => checkByTimeHandler(event)}
                />
            </div>

            <div>
                <p>{transportationFormStrings.sortBy}</p>
                <select
                    value={profitSort}
                    id="byPercentOrProfit" onChange={(event) => selectSortHandler(event)}
                >
                    <option value="BY_PERCENTAGE_PROFIT">{transportationFormStrings.percentageProfit}</option>
                    <option value="BY_PROFIT">{transportationFormStrings.silverProfit}</option>
                    <option value="BY_PROFIT_VOLUME">{transportationFormStrings.profitVolume}</option>
                </select>
            </div>

            <div>
                <p>{transportationFormStrings.from}</p>
                <select
                    value={from}
                    id="fromCity"
                    onChange={(event) => selectFromHandler(event)}
                >
                    {cityOptions.map(city => {
                        if (city === 'Black Market') return;

                        return (
                            <option
                                key={city}
                                value={city}
                            >{city}</option>
                        )
                    })}
                </select>
            </div>

            <div>
                <p>{transportationFormStrings.into}</p>
                <select
                    value={to}
                    id="toCity"
                    onChange={(event) => selectToHandler(event)}
                >
                    {cityOptions.map(city => {
                        if (city === 'Brecilien') return;

                        return (
                            <option
                                value={city}
                                key={city}
                            >{city}</option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}

export default TransportationForm;