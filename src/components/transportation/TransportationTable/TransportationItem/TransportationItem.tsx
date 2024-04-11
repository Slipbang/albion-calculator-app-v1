import {useState} from "react";

import styles from "./TransportationItem.module.scss";

import {TransportationData, TTransportationItemTypes} from "../../../../types/transportationTypes";

import {transportationItems} from "../../../../store/Items/transportationItems";
import {srcRoute} from "../../../../store/api/api";
import {IItemName} from "../../../../store/profit/profit-slice";
import {ISelectedLanguage, TSelectedLanguage} from "../../../../types/languageTypes";

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

    function searchName(itemIdTo: string) {

        const splitItemIdTo = itemIdTo.split('_');
        const itemEnchantment = itemIdTo.includes('@') ? itemIdTo.split('@')[1] : '0';

        let reservedItemTo = itemIdTo.includes('@') ? itemIdTo.split('@')[0] : itemIdTo;

        let itemTier = reservedItemTo.split('_')[0];
        let itemType = reservedItemTo.split('_')[1] as TTransportationItemTypes;

        if (splitItemIdTo.length < 3) {
            reservedItemTo += `_${reservedItemTo.split('_')[1]}`;
        }
        const itemIdMain = reservedItemTo.split(`${itemType}_`);

        const itemIdBody = itemIdMain[1];
        let itemName: IItemName | undefined;

        const allowedTypes =
            ['2H', 'MAIN', 'BAG', 'CAPE', 'CAPEITEM', 'ARMOR', 'HEAD', 'SHOES', 'OFF',
                'LEATHER', 'CLOTH', 'METALBAR', 'PLANKS', 'STONEBLOCK', 'FIBER', 'HIDE',
                'ORE', 'ROCK', 'WOOD', 'BACKPACK', 'SKILLBOOK', 'FACTION', 'RUNE', 'SOUL',
                'RELIC', 'SHARD', 'JOURNAL' ];

        if (allowedTypes.includes(itemType)) {
            itemName = transportationItems[itemType]?.find(elem => elem.itemId === itemIdBody)?.itemName;
        }

        if (itemName !== undefined) {
            return `${itemName[selectedLanguage]} ${itemTier}.${itemEnchantment}`;
        }

        return 'Can\'t find name :(';
    }

    const getDate = (date: string) => {
        const currentDate = new Date();

        if (date === '1970-01-01T00:00:00.000Z' && !date) return '';

        const hours = (currentDate.getTime() - Date.parse(date))/(60*60*1000);

        if(hours <= 24) return <span style={{color: `${hours <= 5 ? "green" : "red"}`}}>({Math.round(hours)}h)</span>;

        if(hours > 24) return <span style="color: red">({Math.round(hours/24)}d)</span>;
    }

    const copyTextHandler = (title: string) => {
        navigator.clipboard.writeText(title).then(() => setWasCopied(true)).then(() => setTimeout(() => setWasCopied(false), 1000));
    }

    const itemName = searchName(itemIdTo);
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