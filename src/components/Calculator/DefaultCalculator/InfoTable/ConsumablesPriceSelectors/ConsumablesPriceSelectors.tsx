import {cityOptions} from "../../../../../store/Options/CityOptions";
import {TConsumableNames} from "../../../../../store/Items/consumablesNamesData";
import {ISelectedLanguage, TSelectedLanguage} from "../../../../../types/languageTypes";
import {IItemsData, TCities} from "../../../../../types/InfoTableTypes";
import {Dispatch, SetStateAction} from "react";
import {TConsumablesSelectors} from "../InfoTable";
import styles from './ConsumablesPriceSelectors.module.scss';

interface IConsumablesSelectorsProps {
    consumableSelectorsKeys: string[];
    consumablesNames: TConsumableNames;
    selectedLanguage: TSelectedLanguage;
    infoTableStrings: ISelectedLanguage['infoTableStrings'];
    consumablesData: IItemsData[];
    setConsumableSelectors: Dispatch<SetStateAction<TConsumablesSelectors>>;
    setFoodTax: Dispatch<SetStateAction<number>>;
    foodTax: number;
}

const ConsumablesPriceSelectors = (props: IConsumablesSelectorsProps) => {
    const {consumableSelectorsKeys, consumablesNames,infoTableStrings, selectedLanguage, consumablesData, setConsumableSelectors, setFoodTax, foodTax} = props;

    const findPrice = (id: string, city: TCities) => {

        return consumablesData?.find(item => item.itemId === id && item.location === city)?.sellPriceMin || 0;
    }
    
    const selectCityHandler = (key: string, city: TCities) => {
        setConsumableSelectors((prevState) => ({
            ...prevState,
            [key]: city,
        }))
    }

    const foodTaxChangeHandler = (value: number) => {
        setFoodTax(value);
    }

    return (
        <div className={styles.wrapper}>
            <div>
                <label htmlFor="foodTax">{infoTableStrings.taxLabel}</label>
                <input
                    type='number'
                    id='foodTax'
                    value={foodTax}
                    onChange={(event) => foodTaxChangeHandler(+event.target.value)}
                />
            </div>
            {consumableSelectorsKeys.map(key => {
                return (
                    <div key={key}>
                        <label htmlFor={key}>{consumablesNames[key][selectedLanguage]}:</label>
                        <select
                            id={key}
                            onChange={(event) => selectCityHandler(key, event.target.value as TCities)}
                        >
                            {cityOptions.map(city => {
                                if (city === 'Black Market') return;

                                return <option
                                    value={city}
                                    key={city}
                                >{city}: {findPrice(key, city)}</option>
                            })}
                        </select>
                    </div>
                )
            })}
        </div>
    )
}

export default ConsumablesPriceSelectors;
