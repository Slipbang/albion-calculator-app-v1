import StyledCraftingButton from "../GMCraftingFormSC/StyledCraftingButton";
import {GMProfitSliceActions} from "../../../../../store/GMProfit/gm-profit-slice";
import {useAppDispatch} from "../../../../../store";
import {useSelector} from "react-redux";
import {
    selectArtefactPriceCF,
    selectArtefactPriceFetchedStateCF,
    selectEnchantmentNumCF,
    selectItemEnchantmentCF,
    selectItemsQuantityCF,
    selectJournalPriceCF,
    selectJournalPriceFetchedStateCF,
    selectJournalUsageCF,
    selectMaterialEnchantmentCF,
    selectOwnArtefactPriceCF,
    selectOwnJournalPriceCF,
    selectReturnPercentCF
} from "../../../../../store/interface/interface-selector";
import {useMaterialsCalculation} from "../Hooks/useMaterialsCalculation";
import {TCalcProps} from "../../../../../types/calculatorPropsType";
import {useJournals} from "../Hooks/useJournals";
import {useArtefacts} from "../Hooks/useArtefacts";
import {useTotalFoodTaxCalculation} from "../Hooks/useTotalFoodTaxCalculation";
import {selectLanguage} from "../../../../../store/language/language-selector";
import {
    selectBackpackItems,
    selectFoodTax,
    selectWorkBenchItem
} from "../../../../../store/GMProfit/gm-profit-selectors";
import {srcRoute} from "../../../../../store/api/api";
import {TMaterialsInfo} from "../../../../../types/craftItemsType";
import {IBagCell} from "../../../../../store/Items/emptyBagCell";

const CraftingButton = (props: { calculatorType: TCalcProps }) => {
    const {calculatorType} = props;

    const dispatchAction = useAppDispatch();

    const foodTax = useSelector(selectFoodTax);
    const isJournalUsed = useSelector(selectJournalUsageCF);
    const ownJournalPrice = useSelector(selectOwnJournalPriceCF);
    const isJournalPriceFetched = useSelector(selectJournalPriceFetchedStateCF);
    const backpackItems = useSelector(selectBackpackItems);
    const enchantmentNum = useSelector(selectEnchantmentNumCF);
    const selectedWorkBenchItem = useSelector(selectWorkBenchItem);
    const itemsQuantity = useSelector(selectItemsQuantityCF);
    const materialEnchantment = useSelector(selectMaterialEnchantmentCF);
    const itemEnchantment = useSelector(selectItemEnchantmentCF);
    const returnPercent = useSelector(selectReturnPercentCF);
    const fetchedJournalPrice = useSelector(selectJournalPriceCF);
    const isArtefactPriceFetched = useSelector(selectArtefactPriceFetchedStateCF);
    const fetchedArtefactPrice = useSelector(selectArtefactPriceCF);
    const ownArtefactPrice = useSelector(selectOwnArtefactPriceCF);

    const {selectedLanguage} = useSelector(selectLanguage);
    const isRuSelected = selectedLanguage === 'ru';

    const backpackIsOverflowed = backpackItems.filter(item => item.itemId !== null).length > 45;

    const {
        consumedMaterials,
        materialApiId,
        maxQuantity,
    } = useMaterialsCalculation({
        backpackItems,
        materialEnchantment,
        itemsQuantity,
        selectedWorkBenchItem,
        enchantmentNum
    });

    const {
        journalApiId,
        totalJournalQuantity,
    } = useJournals({isJournalUsed, itemsQuantity, selectedWorkBenchItem, enchantmentNum});

    const {
        totalArtefactPrice,
    } = useArtefacts({
        itemsQuantity,
        selectedWorkBenchItem,
        fetchedArtefactPrice,
        ownArtefactPrice,
        isArtefactPriceFetched,
    });

    const {
        totalFoodTax,
    } = useTotalFoodTaxCalculation({
        calculatorType,
        enchantmentNum,
        foodTax,
        itemsQuantity,
        selectedWorkBenchItem,
    });

    const {
        itemId,
        itemTier,
        itemNode,
    } = selectedWorkBenchItem;

    const journalPrice = isJournalUsed ? (isJournalPriceFetched ? fetchedJournalPrice : ownJournalPrice) : 0;

    const applyReturnPercent = (consumedQuantity: number) => {
        const random = Math.random();

        return Math[random < 0.5 ? 'floor' : 'ceil'](consumedQuantity - consumedQuantity * (returnPercent / 100));
    }

    const craftItemsHandler = () => {
        if (backpackIsOverflowed) return;

        const craftedItems: IBagCell = {
            itemId: `${itemId}${itemEnchantment}` as string,
            itemTier: `T${itemTier}`,
            itemQuantity: Math.floor(itemsQuantity! * (itemId!.includes('STONEBLOCK') && +enchantmentNum > 0 ? Math.pow(2, +enchantmentNum) : 1)),
            itemImage: `${srcRoute}${itemId}${itemEnchantment}`,
            itemNode,
            itemEnchantmentNum: itemId?.includes('STONEBLOCK') ? '' : enchantmentNum,
            itemEnchantment,
        }

        const consumedMaterialsWithReturnPercent: {[key: string]: number} = {};

        for (const key in consumedMaterials) {
            consumedMaterialsWithReturnPercent[key as keyof TMaterialsInfo['consumedMaterials']] = applyReturnPercent(+consumedMaterials[key as keyof TMaterialsInfo['consumedMaterials']]!);
        }

        const materialsInfo = {
            consumedMaterials: consumedMaterialsWithReturnPercent as TMaterialsInfo['consumedMaterials'],
            materialApiId,
        }

        dispatchAction(GMProfitSliceActions.craftItems({craftedItems, materialsInfo}));
        dispatchAction(GMProfitSliceActions.calculateBagSilver(-(totalFoodTax + totalArtefactPrice)));

        if (calculatorType === 'ITEMS' && isJournalUsed) {
            dispatchAction(GMProfitSliceActions.addJournals({
                journalsQuantity: totalJournalQuantity!,
                journalId: journalApiId!,
                journalPrice: journalPrice!,
            }))
        }
    }

    const isReturnPercentInputValid = (value: number) => {
        return value >= 15.2 && value <= 70;
    }

    return (
        <StyledCraftingButton
            onDragStart={event => event.preventDefault()}
            onDragOver={event => event.preventDefault()}
            onDrag={event => event.preventDefault()}
            onDragEnter={event => event.preventDefault()}
            onMouseDown={(event) => event.preventDefault()}

            draggable={true}
            $isRuSelected={isRuSelected}
            $isActive={!!maxQuantity && !backpackIsOverflowed && isReturnPercentInputValid(returnPercent)}
            disabled={!maxQuantity || backpackIsOverflowed || !isReturnPercentInputValid(returnPercent)}
            onClick={craftItemsHandler}
        />
    )
}

export default CraftingButton;