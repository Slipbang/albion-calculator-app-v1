import CustomItemSelector from "../../../CustomSelectors/CustomItemSelector";
import StyledItemQualitySelector from "../MarketItemSC/StyledItemQualitySelector";
import {IOptions, qualityOptions} from "../../../../../store/Options/CustomSelecrorsOptions";
import {useAppDispatch} from "../../../../../store";
import {interfaceSliceActions} from "../../../../../store/interface/interface-slice";
import {useSelector} from "react-redux";
import {selectItemQualityMI} from "../../../../../store/interface/interface-selector";
import styles from './ItemQualitySelector.module.scss'
import StyledResetQualityButton from "../MarketItemSC/StyledResetQualityButton";
import {selectMarketItem} from "../../../../../store/GMProfit/gm-profit-selectors";
import {TItemNode} from "../../../../../types/craftItemsType";
import {isTypeResource} from "../../FunctionUtils/defineType";
import {selectLanguage} from "../../../../../store/language/language-selector";

const ItemQualitySelector = () => {
    const selectedQuality = useSelector(selectItemQualityMI);
    const dispatchAction = useAppDispatch();

    const selectedMarketItem = useSelector(selectMarketItem);
    const {language} = useSelector(selectLanguage);
    const {marketItemStings} = language;
    const {itemTier, itemEnchantmentNum, itemNode} = selectedMarketItem;

    const defineItemData = (itemTier: string, itemEnchantmentNum: string, itemNode: TItemNode) => {
        return {
            isDisabled: isTypeResource(itemNode),
            tier: itemTier.split('T')[1],
            enchantment: !itemEnchantmentNum ? 0 : +itemEnchantmentNum,
        };
    }
    const {tier, enchantment, isDisabled} = defineItemData(itemTier, itemEnchantmentNum, itemNode!)

    const setSelectedQuality = (option: IOptions) => {
        dispatchAction(interfaceSliceActions.setItemQualityMI(option));
    }

    return (
        <StyledItemQualitySelector
            data-type={isDisabled ? 'resource' : 'equipment'}
        >
            <p className={styles.tierLabel}>{marketItemStings.tier} {tier}</p>
            <p className={styles.enchantmentLabel}>{marketItemStings.enchantment} {enchantment}</p>
            <CustomItemSelector
                disabled={isDisabled}
                selectInputClass={styles.selectQualityStyle}
                paramsSelectorClass={styles.qualitySelector}
                customOptionSelectedClass={styles.customOptionSelected}
                customOptionClass={styles.customOption}
                setSelectedParams={setSelectedQuality}
                paramsOptions={qualityOptions}
                paramState={selectedQuality}
            />
            <StyledResetQualityButton
                onClick={() => setSelectedQuality(qualityOptions[0])}
            />
        </StyledItemQualitySelector>
    )
}

export default ItemQualitySelector;