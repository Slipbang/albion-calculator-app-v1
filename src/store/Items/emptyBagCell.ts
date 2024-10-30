import {
    backpackCell
} from "../../components/Calculator/GameModeCalculator/Backpack/BackpackImgReexports/BackpackImgReexports";
import {IGMCraftItem} from "../utils/createWorkBenchSelectorItems";


export interface IBagCell extends Pick<IGMCraftItem, 'itemId' | 'itemImage' | 'itemNode'  > {
    itemCellImg?: string;
    itemQuantity: number | null;
    itemTier: string;
    itemIndex?: number;
    itemEnchantmentNum: string;
    itemEnchantment: string;
}

export const emptyBagCell: IBagCell = {
    itemId: null,
    itemTier: '',
    itemQuantity: null,
    itemNode: '',
    itemEnchantmentNum: '',
    itemImage: '',
    itemEnchantment: '',
    itemCellImg: backpackCell,
}