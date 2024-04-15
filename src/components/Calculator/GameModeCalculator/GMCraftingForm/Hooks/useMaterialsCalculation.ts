import {IConsumedMaterials} from "../../../../../types/craftItemsType";
import {TExtractedMaterialsKeys} from "../GMCraftingForm";
import {ISelectedWorkBenchItem} from "../../../../../store/GMProfit/gm-profit-slice";
import {IBagCell} from "../../../../../store/Items/workBenchSelectorItems_marketItems";

export interface IBackpackMatsQuantity {
    backpackLEATHERQuantity: number | null;
    backpackPLANKSQuantity: number | null;
    backpackCLOTHQuantity: number | null;
    backpackMETALBARQuantity: number | null;
    backpackSTONEBLOCKQuantity: number | null;
    backpackOREQuantity: number | null;
    backpackWOODQuantity: number | null;
    backpackFIBERQuantity: number | null;
    backpackHIDEQuantity: number | null;
    backpackROCKQuantity: number | null;
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

    let selectedWorkBenchItemKeys = Object.keys(selectedWorkBenchItem) as TExtractedMaterialsKeys[];

    const matsKeys: TExtractedMaterialsKeys[] = [];

    selectedWorkBenchItemKeys.forEach(key=> {
        if (key.toUpperCase() === key){
            matsKeys.push(key);
        }
    })

    const materialsCalculation = (): {matsData: Pick<IConsumedMaterials, 'materialApiId' | 'consumedMaterials'>, backpackMatsQuantity: IBackpackMatsQuantity} => {
        let materialApiId: IConsumedMaterials['materialApiId'] | undefined = undefined;
        let consumedMaterials: IConsumedMaterials['consumedMaterials'] | undefined = undefined;
        let backpackMatsQuantity: IBackpackMatsQuantity | undefined = undefined;

        matsKeys.forEach(key => {

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

        matsKeys.forEach(key => {
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
        matsKeys,
        maxQuantity,
    }
}

export {useMaterialsCalculation};