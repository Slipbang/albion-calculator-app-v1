import {useEffect, useRef, useState} from "react";
import {IItemsData} from "../../../types/InfoTableTypes";
import {cityOptions} from "../../../store/Options/CityOptions";

interface ICustomPriceSelectorProps {
    itemsData: IItemsData[],
    setFunction: (value: number) => void;
    selectorStyles: string;
    selectedCityStyles: string;
    optionsStyles: string;
    cityListStyles: string;
}

const CustomPriceSelector = (props: ICustomPriceSelectorProps) => {
    const {
        itemsData,
        setFunction,
        selectorStyles,
        selectedCityStyles,
        optionsStyles,
        cityListStyles,
    } = props;

    const [selectedCity, setSelectedCity] = useState(cityOptions[0]);
    const [isCityOptionsVisible, setIsCityOptionsVisible] = useState(false);

    const inputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const clickOutsideSelectorHandler = (event: MouseEvent) => {
            if (!event.composedPath().includes(inputRef.current!)) {
                setIsCityOptionsVisible(false);
            }
        }

        document.body.addEventListener('click', clickOutsideSelectorHandler);

        return () => {
            document.body.removeEventListener('click', clickOutsideSelectorHandler);
        }
    }, []);

    const getPrice = (city: string) => {
        return itemsData?.find(item => item.location === city)?.sellPriceMin;
    }

    const getDate = (city: string) => {
        const itemsDate = itemsData?.find(item => item.location === city)?.sellPriceMinDate || '';

        if (itemsDate === '1970-01-01T00:00:00.000Z' || !itemsDate) return ''

        const currentDate = new Date();

        const itemWasUpdated = (currentDate.getTime() - Date.parse(itemsDate))/(60*60*1000);

        if (itemWasUpdated >= 24) {
            return <span style={{color: 'red'}}>({Math.round(itemWasUpdated/24)}d)</span>;
        }

        return <span style={{color: `${itemWasUpdated <= 5 ? 'green' : 'red'}`}}>({Math.round(itemWasUpdated)}h)</span>;
    }


    const setItemPriceHandler = (value: number) => {
        setFunction(value);
    }

    useEffect(() => {
        setItemPriceHandler(getPrice(selectedCity)!)
    }, [])

    return <div
        ref={inputRef}
        className={selectorStyles}
        onClick={() => setIsCityOptionsVisible(prevState => !prevState)}
    >
        <div className={selectedCityStyles}>
            <p>{selectedCity}: {getPrice(selectedCity)?.toLocaleString('en') || 0}</p>
        </div>
        {isCityOptionsVisible && <div
            onClick={(event) => {
                event.stopPropagation();
            }}
            className={optionsStyles}
        >
            {cityOptions.map((city, index) => {

                return (
                    <div
                        key={index}
                        className={cityListStyles}
                        onClick={() => {
                            setSelectedCity(cityOptions[index]);
                            setIsCityOptionsVisible(false);
                            setItemPriceHandler(getPrice(city)!)
                        }}
                    >
                        <p>{city}: {getPrice(city)?.toLocaleString('en') || 0} {getDate(city)}</p>
                    </div>
                )
            })}
        </div>}
    </div>
}

export default CustomPriceSelector;