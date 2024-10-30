import {useState} from "react";

import styles from "./TransportationItem.module.scss";

import {TransportationData} from "../../../../types/transportationTypes";

import {srcRoute} from "../../../../store/api/api";
import {ISelectedLanguage, TSelectedLanguage} from "../../../../types/languageTypes";
import {useSelector} from "react-redux";
import {selectInterfaceLanguageData} from "../../../../store/interface/interface-selector";

interface ITransportationItemProps {
    transportationData: TransportationData;
    language: ISelectedLanguage['transportationTableStrings'];
    selectedLanguage: TSelectedLanguage;
}

const TransportationItem = ({transportationData, language, selectedLanguage}: ITransportationItemProps) => {
    const {
        normalizedPrice: normalizedPriceFrom,
        date: dateFrom,
    } = transportationData.from;
    const {
        itemId: itemIdTo,
        normalizedPrice: normalizedPriceTo,
        averageItems: averageItemsTo,
        date: dateTo,
    } = transportationData.to;

    const [wasCopied, setWasCopied] = useState(false);
    const languageData = useSelector(selectInterfaceLanguageData);

    const getDate = (date: string) => {
        const currentDate = new Date();

        if (date === '1970-01-01T00:00:00.000Z' && !date) return '';

        const hours = (currentDate.getTime() - Date.parse(date))/(60*60*1000);

        return <span style={{color: `${hours <= 5 ? "green" : "red"}`}}>({hours <= 24 ? `${Math.round(hours) || '<1'}h` : `${Math.round(hours/24)}d`})</span>;
    }

    const copyTextHandler = (title: string) => {
        navigator.clipboard.writeText(title).then(() => setWasCopied(true)).then(() => setTimeout(() => setWasCopied(false), 1000));
    }

    const itemName = languageData[itemIdTo]?.[selectedLanguage] || 'no name found';
    const profit = Math.floor((normalizedPriceTo - normalizedPriceTo * 0.065) - +normalizedPriceFrom);

    return (
        <>
            <tr className={styles.itemStyle}>
                <td>
                    <img
                        draggable={false}
                        src={`${srcRoute}${itemIdTo}`}
                        alt=''
                        title={itemName}
                    />
                </td>
                <td>
                    <div onClick={() => copyTextHandler(itemName)}>
                        {!wasCopied ? itemName : language.copyAlert}
                    </div>
                </td>
                <td>{normalizedPriceFrom.toLocaleString('en')} {getDate(dateFrom)}</td>
                <td>{normalizedPriceTo.toLocaleString('en')} {getDate(dateTo)}</td>
                <td>{profit.toLocaleString('en')}</td>
                <td>{`${((((normalizedPriceTo - normalizedPriceTo * 0.065) - normalizedPriceFrom)) * 100 / normalizedPriceFrom).toFixed(0)}%`}</td>
                <td>{`${Math.floor(averageItemsTo).toLocaleString('en')} ${language.unPerDay}`}</td>
            </tr>
        </>
    )
}

export default TransportationItem;