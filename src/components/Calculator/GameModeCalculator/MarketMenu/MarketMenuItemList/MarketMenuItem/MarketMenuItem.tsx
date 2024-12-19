import styles from './MarketMenuItem.module.scss';
import StyledMarketActionButton from "../../MarketMenuSC/StyledMarketActionButton";
import {useAppDispatch} from "../../../../../../store";
import {useSelector} from "react-redux";
import {
    selectDemoMode,
    selectEnchantmentMM, selectGuide,
    selectInputMM, selectInterfaceLanguageData,
    selectItemTypeMM,
    selectTierMM
} from "../../../../../../store/interface/interface-selector";
import {selectMarketAction} from "../../../../../../store/GMProfit/gm-profit-selectors";
import {GMProfitSliceActions} from "../../../../../../store/GMProfit/gm-profit-slice";
import {interfaceSliceActions} from "../../../../../../store/interface/interface-slice";
import {TSelectedLanguage} from "../../../../../../types/languageTypes";
import {IBagCell} from "../../../../../../store/Items/emptyBagCell";
import {escapeRegex} from "../../../FunctionUtils/escapeRegex";
import {useEffect, useRef} from "react";

interface IMarketMenuItemProps {
    item: IBagCell;
    index: number;
    selectedLanguage: TSelectedLanguage;
}

type TScenario = {
    [key: string]: string;
}

//каждому шагу сценария (4/20/22) соответствует свой itemId, который мы потом сверяем в объекте по ключам заданными этими же номерами шагов,
//когда scenario[script] совпадает с айдишником, происходит инициирование нажатия кнопки
const scenario: TScenario = {
    '4': 'T6_LEATHER_LEVEL1@1',
    '20': 'T6_ARMOR_LEATHER_MORGANA@1',
    '22': 'T6_JOURNAL_HUNTER_FULL'
}

const MarketMenuItem = ({item, index, selectedLanguage}: IMarketMenuItemProps) => {
    const {itemId, itemImage, itemTier, itemNode, itemEnchantmentNum, itemEnchantment, itemQuantity} = item;
    const dispatchAction = useAppDispatch();

    const selectedTier = useSelector(selectTierMM);
    const selectedItemType = useSelector(selectItemTypeMM);
    const selectedEnchantment = useSelector(selectEnchantmentMM);
    const inputSearch = useSelector(selectInputMM);
    const marketActionSelected = useSelector(selectMarketAction);
    const isRuSelected = selectedLanguage === 'ru';
    const languageData = useSelector(selectInterfaceLanguageData);
    const itemName = languageData[itemId!]?.[selectedLanguage];
    const {script} = useSelector(selectGuide);
    const isDemo = useSelector(selectDemoMode);

    const buttonRef = useRef<HTMLButtonElement>(null);

    const setMarketItemHandler = (selectedMarketItem: IBagCell) => {
        dispatchAction(GMProfitSliceActions.setSelectedMarketItem(selectedMarketItem));
        dispatchAction(interfaceSliceActions.setMarketItemVisibility(true));
    }

    const validateItemHandler = (type: string, enchantment: string, tier: string, title: string) => {
        const fixedInputSearch = escapeRegex(inputSearch);

        return (selectedItemType.value !== '' ? selectedItemType.value.includes(type) : true)
            && selectedEnchantment.value.includes(enchantment || '0')
            && selectedTier.value.includes(tier)
            && title.toLowerCase().match(fixedInputSearch.toLowerCase());
    }

    useEffect(() => {
        if (scenario?.[script] === itemId) buttonRef.current?.click();
    }, [script])

    return (
        <div
            className={styles.materialItem}
            style={validateItemHandler(itemNode!, itemEnchantmentNum, itemTier, itemName) ? {display: 'flex'} : {display: 'none'}}
        >
            <div
                title={itemName}
                className={styles.itemImg}
            >
                <img
                    className={styles.backgroundSkeleton}
                    draggable={false}
                    src={itemImage}
                    alt={itemName}
                />
                <div className={styles.itemQuantity}>
                    <p>{itemQuantity}</p>
                </div>
            </div>

            <div
                className={styles.itemName}
                style={{fontSize: `${(itemName.length || 0) < 17 ? 15 : 12}px`}}
            >
                <p>{itemName}</p>
            </div>

            <StyledMarketActionButton
                $isDemo={isDemo}
                $isActionBuy={marketActionSelected === 'buy'}
                $isRuSelected={isRuSelected}
                ref={Object.values(scenario).includes(itemId!) ? buttonRef : null}
                onClick={() => {
                    setMarketItemHandler({
                        itemQuantity,
                        itemImage,
                        itemId,
                        itemTier,
                        itemIndex: index,
                        itemNode,
                        itemEnchantmentNum,
                        itemEnchantment,
                    })
                }}
            />
        </div>
    )
}

export default MarketMenuItem;