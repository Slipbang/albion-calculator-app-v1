import {TMaterialsInfo, TResourceType} from "../../../../../types/craftItemsType";
import {TExtractedMaterialsKeys} from "../GMCraftingForm";
import {ISelectedWorkBenchItem} from "../../../../../store/GMProfit/gm-profit-slice";
import {IBagCell} from "../../../../../store/Items/emptyBagCell";

export type TBackpackMatsQuantity = {
    [key in TResourceType as `backpack${Capitalize<string & key>}Quantity`]: number | null;
}

interface IUseMaterialsCalculationProps {
    backpackItems: IBagCell[],
    enchantmentNum: string,
    selectedWorkBenchItem: ISelectedWorkBenchItem,
    itemsQuantity: number,
    materialEnchantment: string,
}

const useMaterialsCalculation = (props: IUseMaterialsCalculationProps) => {
    const {
        backpackItems,
        enchantmentNum,
        selectedWorkBenchItem,
        itemsQuantity,
        materialEnchantment,
    } = props;

    const {
        itemTier,
    } = selectedWorkBenchItem;

    const materialKeys = [...Object.keys(selectedWorkBenchItem).filter(key => key.toUpperCase() === key)] as TExtractedMaterialsKeys[] ;

    const materialsCalculation = (): {matsData: Pick<TMaterialsInfo, 'materialApiId' | 'consumedMaterials'>, backpackMatsQuantity: TBackpackMatsQuantity} => {
        let materialApiId: TMaterialsInfo['materialApiId'] | undefined = undefined;
        let consumedMaterials: TMaterialsInfo['consumedMaterials'] | undefined = undefined;
        let backpackMatsQuantity: TBackpackMatsQuantity | undefined = undefined;

        materialKeys.forEach(key => {

            let tier: number = itemTier;
            let enchantment: string = materialEnchantment!;

            if (+selectedWorkBenchItem[key]! === 1){
                tier = itemTier - 1;
            }

            if (itemTier === 4 && +selectedWorkBenchItem[key]! === 1){
                enchantment = '';
            }

            materialApiId = {
                ...materialApiId!,
                [`${key}ApiId`]: `T${tier}_${key}${key === 'STONEBLOCK' ? '' : enchantment}`,
            }
            consumedMaterials = {
                ...consumedMaterials!,
                [`consume${key}Quantity`]: +selectedWorkBenchItem[key]! * Math.floor(itemsQuantity) * (key === 'STONEBLOCK' ? Math.pow(2, +enchantmentNum) : 1) || 0,
            }
            backpackMatsQuantity = {
                ...backpackMatsQuantity!,
                [`backpack${key}Quantity`]: backpackItems.filter(item => item.itemId === `T${tier}_${key}${key === 'STONEBLOCK' ? '' : enchantment}`).reduce((acc, item) => acc + item.itemQuantity!, 0),
            }
        })

        return {
            matsData: {
                consumedMaterials: consumedMaterials!,
                materialApiId: materialApiId!,
            },
            backpackMatsQuantity: backpackMatsQuantity!,
        };
    };


    const {
        matsData,
        backpackMatsQuantity,
    } = materialsCalculation();

    const maxQuantityCalculation = () => {
        const materialsDivisionFactors: number[] = [];
        let maxQuantity = 0;
        let noMatsInBackpack = false;

        materialKeys.forEach(key => {
            if (!!selectedWorkBenchItem[key]!){
                if (backpackMatsQuantity[`backpack${key}Quantity`]! >= +selectedWorkBenchItem[key]!){
                    materialsDivisionFactors.push(Math.floor(backpackMatsQuantity[`backpack${key}Quantity`]! / +selectedWorkBenchItem[key]!));
                } else {
                    noMatsInBackpack = true;
                }
            }
        })

        if (noMatsInBackpack){
            return maxQuantity;
        }
        maxQuantity = Math.min(...materialsDivisionFactors);

        return maxQuantity;
    }

    const maxQuantity = maxQuantityCalculation();

    const {consumedMaterials, materialApiId} = matsData;

    return {
        consumedMaterials,
        materialApiId,
        backpackMatsQuantity,
        materialKeys,
        maxQuantity,
    }
}

export {useMaterialsCalculation};