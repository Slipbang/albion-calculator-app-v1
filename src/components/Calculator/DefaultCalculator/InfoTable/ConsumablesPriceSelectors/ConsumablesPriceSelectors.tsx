import {cityOptions} from "../../../../../store/Options/CityOptions";
import {TConsumableNames} from "../../../../../store/Items/consumablesNamesData";
import {ISelectedLanguage, TSelectedLanguage} from "../../../../../types/languageTypes";
import {IItemsData, TCities} from "../../../../../types/InfoTableTypes";
import {Dispatch, SetStateAction, useState} from "react";
import {TConsumablesSelectors} from "../InfoTable";
import styles from './ConsumablesPriceSelectors.module.scss';

interface IConsumablesSelectorsProps {
    consumableSelectorsKeys: string[];
    consumableSelectors: TConsumablesSelectors;
    consumablesNames: TConsumableNames;
    selectedLanguage: TSelectedLanguage;
    infoTableStrings: ISelectedLanguage['infoTableStrings'];
    consumablesData: IItemsData[];
    setConsumableSelectors: Dispatch<SetStateAction<TConsumablesSelectors>>;
    setFoodTax: Dispatch<SetStateAction<number>>;
    foodTax: number;
    currentDate: Date;
}

const ConsumablesPriceSelectors = (props: IConsumablesSelectorsProps) => {
    const {consumableSelectorsKeys, consumableSelectors,consumablesNames,infoTableStrings, selectedLanguage, consumablesData, setConsumableSelectors, setFoodTax, foodTax, currentDate} = props;

    const [isSelectorsDivided, setIsSelectorsDivided] = useState(false);

    const findPrice = (id: string, city: TCities) => {
        const consumableItemData = consumablesData?.find(item => item.itemId === id && item.location === city);
        const consumableItemPrice = consumableItemData?.sellPriceMin || 0;
        const consumableItemDate = consumableItemData?.sellPriceMinDate || '';
        const hours = consumableItemDate !== '1970-01-01T00:00:00.000Z' ? (currentDate.getTime() - Date.parse(consumableItemDate)) / (60 * 60 * 1000) : '';
        const finalHours = typeof hours === 'number' ? (`(${hours <= 24 ? `${Math.round(hours) || '<1'}h` : `${Math.round(hours / 24)}d`})`) : '';

        return {consumableItemPrice,finalHours};
    }

    const selectAllCitiesHandler = (city: TCities) => {
        const newState: {[key: string]: TCities} = {};
        consumableSelectorsKeys.forEach(selectorKey => {
            newState[selectorKey] = city;
        })
        setConsumableSelectors(newState);
    }

    const selectCityHandler = (city: TCities, key: string,) => {
        if (!isSelectorsDivided) {
            selectAllCitiesHandler(city);
        }

        setConsumableSelectors((prevState) => ({
            ...prevState,
            [key!]: city,
        }))
    }

    const foodTaxChangeHandler = (value: number) => {
        setFoodTax(value);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.checkbox}>
                <label htmlFor="isSelectorsDivided">{infoTableStrings.multipleCities}</label>
                <input id='isSelectorsDivided'
                       type="checkbox"
                       checked={isSelectorsDivided}
                       onChange={(event) =>{
                           if (!event.target.checked) {
                               selectAllCitiesHandler('Fort Sterling');
                           }
                           setIsSelectorsDivided(event.target.checked);
                       }}
                />
            </div>
            <div>
                <label htmlFor="foodTax">{infoTableStrings.taxLabel}</label>
                <input
                    type='number'
                    id='foodTax'
                    value={foodTax}
                    onChange={(event) => foodTaxChangeHandler(+event.target.value)}
                />
            </div>
            {consumableSelectorsKeys.map((key, index) => {
                if (!isSelectorsDivided && index > 0) return;

                return (
                    <div key={key}>
                        <label htmlFor={key}>{isSelectorsDivided ? `${consumablesNames[key][selectedLanguage]}:` : infoTableStrings.resourcesFrom}</label>
                        <select
                            value={consumableSelectors[key]}
                            id={key}
                            onChange={(event) => selectCityHandler(event.target.value as TCities, key)}
                        >
                            {cityOptions.map(city => {
                                if (city === 'Black Market') return;

                                const {consumableItemPrice, finalHours} = findPrice(key, city);

                                return <option
                                    value={city}
                                    key={city}
                                >{city}{isSelectorsDivided ? `: ${consumableItemPrice} ${finalHours}` : ''}</option>
                            })}
                        </select>
                    </div>
                )
            })}
        </div>
    )
}

export default ConsumablesPriceSelectors;
