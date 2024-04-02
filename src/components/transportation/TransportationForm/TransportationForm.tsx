import {ChangeEventHandler} from "react";

import styles from "./TransportationForm.module.scss";

import {useAppDispatch} from "../../../store";
import {transportationSliceActions} from "../../../store/transportation/transportation-slice";
import {useSelector} from "react-redux";
import {selectLanguage} from "../../../store/language/language-selector";
import {cityOptions} from "../../../store/Options/CityOptions";
import {selectTransportation} from "../../../store/transportation/transportation-selectors";
import {TSortCheckParams, TSortProfitParams} from "../../../store/api/api";

const TransportationForm = () => {
    const {from, to, profitSort} = useSelector(selectTransportation);
    const dispatchAction = useAppDispatch();

    const {language} = useSelector(selectLanguage);
    const {transportationFormStrings} = language;


    const selectServerHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
        dispatchAction(transportationSliceActions.setServer(event.target.value));
    };

    const selectFromHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
        dispatchAction(transportationSliceActions.setCityFrom(event.target.value));
    };

    const selectToHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
        dispatchAction(transportationSliceActions.setCityTo(event.target.value));
    };

    const selectSortHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
        dispatchAction(transportationSliceActions.setProfitSort(event.target.value as TSortProfitParams))
    };

    const checkByTimeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
        const checkSort = (event.target.checked ? event.target.value : '') as TSortCheckParams;
        dispatchAction(transportationSliceActions.setCheckSort(checkSort));
    }

    return (
        <div className={styles.transportationFormStyles}>
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
                <p>{transportationFormStrings.server}</p>
                <select
                    id="server"
                    onChange={(event) => selectServerHandler(event)}
                >
                    <option value="aod_west">{transportationFormStrings.albionWest}</option>
                    <option value="aod_east">{transportationFormStrings.albionEast}</option>
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