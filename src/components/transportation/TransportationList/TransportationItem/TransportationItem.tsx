import {useState} from "react";

import styles from "./TransportationItem.module.scss";

import {IItemType, TransportationData, TTransportationItemTypes} from "../../../../types/transportationTypes";

import {transportationItems} from "../../../../store/Items/transportationItems";
import {useSelector} from "react-redux";
import {selectLanguage} from "../../../../store/language/language-selector";
import {srcRoute} from "../../../../store/api/api";

const TransportationItem = (props: TransportationData) => {
    const [wasCopied, setWasCopied] = useState(false)
    const {
        normalizedPrice: normalizedPriceFrom,
    } = props.from;
    const {
        itemId: itemIdTo,
        normalizedPrice: normalizedPriceTo,
        averageItems: averageItemsTo
    } = props.to;

    const {selectedLanguage} = useSelector(selectLanguage);

    const isSelectedRu: boolean = selectedLanguage === 'ru';

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
        let itemObject: IItemType[] = [];

        const allowedTypes =
            ['2H', 'MAIN', 'BAG', 'CAPE', 'CAPEITEM', 'ARMOR', 'HEAD', 'SHOES', 'OFF',
                'LEATHER', 'CLOTH', 'METALBAR', 'PLANKS', 'STONEBLOCK', 'FIBER', 'HIDE',
                'ORE', 'ROCK', 'WOOD', 'BACKPACK', 'SKILLBOOK', 'FACTION', 'RUNE', 'SOUL',
                'RELIC', 'SHARD', 'JOURNAL' ];

        if (allowedTypes.includes(itemType)) {
            itemObject = transportationItems[`${itemType}`]?.filter(elem => elem.itemId === itemIdBody);
        }

        if (itemObject !== undefined && itemObject.length > 0) {
            return `${itemObject[0].itemName[selectedLanguage]} ${itemTier}.${itemEnchantment}`;
        }


        return 'Can\'t find name :(';
    }

    const copyTextHandler = (title: string) => {
        navigator.clipboard.writeText(title).then(() => setWasCopied(true)).then(() => setTimeout(() => setWasCopied(false), 1000));
    }

    let itemName = searchName(itemIdTo);
    let profit = Math.floor((normalizedPriceTo - normalizedPriceTo * 0.065) - +normalizedPriceFrom);

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
                    <h4 onClick={() => copyTextHandler(itemName)}>
                        {!wasCopied ? itemName : `${isSelectedRu ? 'Скопировано!' : 'Copied!'}`}
                    </h4>
                </td>
                <td>{normalizedPriceFrom.toLocaleString('en')}</td>
                <td>{normalizedPriceTo.toLocaleString('en')}</td>
                <td>{profit.toLocaleString('en')}</td>
                <td>{`${((((normalizedPriceTo - normalizedPriceTo * 0.065) - normalizedPriceFrom)) * 100 / normalizedPriceFrom).toFixed(0)}%`}</td>
                <td>{`${Math.floor(averageItemsTo).toLocaleString('en')} ${isSelectedRu ? 'ед/сут' : 'un/d'}`}</td>
            </tr>
        </>
    )
}

export default TransportationItem;