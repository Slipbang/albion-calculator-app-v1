import {cityOptions} from "../../../../../store/Options/CityOptions";
import {TConsumableNames} from "../../../../../store/Items/foodNames";
import {TSelectedLanguage} from "../../../../../types/languageTypes";
import {IItemsData, TCities} from "../../../../../types/InfoTableTypes";
import {Dispatch, SetStateAction} from "react";
import {TConsumablesSelectors} from "../InfoTable";
import styles from './ConsumablesSelectors.module.scss';

interface IConsumablesSelectorsProps {
    consumableSelectorsKeys: string[];
    consumableNames: TConsumableNames;
    selectedLanguage: TSelectedLanguage;
    consumablesData: IItemsData[];
    setConsumableSelectors: Dispatch<SetStateAction<TConsumablesSelectors>>;
    setFoodTax: Dispatch<SetStateAction<number>>;
    foodTax: number;
}

const ConsumablesSelectors = (props: IConsumablesSelectorsProps) => {
    const {consumableSelectorsKeys, consumableNames, selectedLanguage, consumablesData, setConsumableSelectors, setFoodTax, foodTax} = props;

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
                <label htmlFor="foodTax">Налог:</label>
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
                        <label htmlFor={key}>{consumableNames[key][selectedLanguage]}:</label>
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

export default ConsumablesSelectors;
