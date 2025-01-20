import {useEffect, useRef, useState} from "react";
import {IItemsData} from "../../../types/InfoTableTypes";
import {cityOptions} from "../../../store/Options/CityOptions";
import {useSelector} from "react-redux";
import {selectGuide} from "../../../store/interface/interface-selector";

interface ICustomPriceSelectorProps {
    itemsData: IItemsData[],
    setFunction: (value: number) => void;
    selectorStyles: string;
    selectedCityStyles: string;
    optionsStyles: string;
    cityListStyles: string;
    quality?: number;
}

const CustomPriceSelector = (props: ICustomPriceSelectorProps) => {
    const {
        itemsData,
        setFunction,
        selectorStyles,
        selectedCityStyles,
        optionsStyles,
        cityListStyles,
        quality,
    } = props;

    const [selectedCity, setSelectedCity] = useState(cityOptions[0]);
    const [isCityOptionsVisible, setIsCityOptionsVisible] = useState(false);
    const {script} = useSelector(selectGuide);
    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const clickOutsideSelectorHandler = (event: MouseEvent) => {
            if (!event.composedPath().includes(divRef.current!)) {
                setIsCityOptionsVisible(false);
            }
        }

        document.body.addEventListener('click', clickOutsideSelectorHandler);

        setItemPriceHandler(getPrice(selectedCity, quality)!)

        if ([5,14,17].includes(script)) {
            setTimeout(() => divRef.current?.click(), 200);
        }

        return () => {
            document.body.removeEventListener('click', clickOutsideSelectorHandler);
        }
    }, [script]);

    const getPrice = (city: string, quality: number | undefined) => {
        return itemsData?.find(item => item.location === city && item.quality === (quality || 1))?.sellPriceMin ?? 0;
    }

    const getDate = (city: string) => {
        const itemsDate = itemsData?.find(item => item.location === city)?.sellPriceMinDate || '';

        if (itemsDate === '1970-01-01T00:00:00.000Z' || !itemsDate) return ''

        const currentDate = new Date();

        const hours = (currentDate.getTime() - Date.parse(itemsDate))/(60*60*1000);

        return <span style={{color: `${hours <= 5 ? "green" : "red"}`}}>({hours <= 24 ? `${Math.round(hours) || '<1'}h` : `${Math.round(hours / 24)}d`})</span>
    }


    const setItemPriceHandler = (value: number) => {
        setFunction(value);
    }

    return <div
        ref={divRef}
        className={selectorStyles}
        onClick={() => setIsCityOptionsVisible(prevState => !prevState)}
    >
        <div className={selectedCityStyles}>
            <p>{selectedCity}: {getPrice(selectedCity, quality)?.toLocaleString('en') || 0}</p>
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
                            setItemPriceHandler(getPrice(city, quality)!)
                        }}
                    >
                        <p>{city}: {getPrice(city, quality)?.toLocaleString('en') || 0} {getDate(city)}</p>
                    </div>
                )
            })}
        </div>}
    </div>
}

export default CustomPriceSelector;