import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {ICraftingItemClass, TItemTypeSelected, TMaterialsInfo} from "../../types/craftItemsType";
import {
    tannerAvatar,
    tannerWorkerAvatar
} from "../../components/Calculator/GameModeCalculator/GMItemSelector/GMItemSelectorImgReexports/GMItemSelectorImgReexports";
import {emptyBagCell, IBagCell, marketItems, IGMCraftItem} from "../Items/workBenchSelectorItems_marketItems";

export interface ISelectedWorkBenchItem extends IGMCraftItem{
    artefactsQuantity?: number;
}

export type TMarketActions = 'buy' | 'sell';

interface IInitialState {
    workBenchTypeSelected: ICraftingItemClass,
    workBenchAvatar: string;
    workBenchWorkerAvatar: string;
    backpackItems: IBagCell[];
    itemTypeSelected: TItemTypeSelected;
    selectedWorkBenchItem: ISelectedWorkBenchItem;
    selectedMarketItem: IBagCell,
    marketItems: IBagCell[];
    marketActionSelected: TMarketActions;
    foodTax: number;
    backpackSilver: number;
}

const initialState: IInitialState = {
    itemTypeSelected: 'resources',
    workBenchTypeSelected: 'tanner',
    workBenchAvatar: tannerAvatar,
    workBenchWorkerAvatar: tannerWorkerAvatar,

    backpackItems: Array.from({length: 48}, () => emptyBagCell),
    selectedWorkBenchItem: {
        itemId: '',
        LEATHER: null,
        METALBAR: null,
        CLOTH: null,
        PLANKS: null,
        STONEBLOCK: null,
        ORE: null,
        WOOD: null,
        HIDE: null,
        FIBER: null,
        ROCK: null,
        itemTier: 0,
        itemClass: '',
        itemImage: '',
        itemNode: '',
    },
    selectedMarketItem: {
        itemId: null,
        itemTier: '',
        itemImage: '',
        itemQuantity: 0,
        itemNode: '',
        itemEnchantmentNum: '',
        itemEnchantment: '',
    },
    marketItems: marketItems,
    marketActionSelected: 'buy',
    foodTax: 0,
    backpackSilver: 0,
};

const GMProfitSlice = createSlice({
    name: '@GMProfit',
    initialState,
    reducers: {
        setWorkBenchTypeSelected(state, action: PayloadAction<{workBenchType: ICraftingItemClass, workBenchAvatar: string, workBenchWorkerAvatar: string}>){
            state.workBenchTypeSelected = action.payload.workBenchType;
            state.workBenchAvatar = action.payload.workBenchAvatar;
            state.workBenchWorkerAvatar = action.payload.workBenchWorkerAvatar;
        },
        setMarketTypeAction(state, action: PayloadAction<TMarketActions>){
            state.marketActionSelected = action.payload;
        },
        setItemTypeSelected(state, action: PayloadAction<TItemTypeSelected>){
            state.itemTypeSelected = action.payload;
        },
        setSelectedWorkBenchItem(state, action: PayloadAction<ISelectedWorkBenchItem>){
            state.selectedWorkBenchItem = action.payload;
        },
        setSelectedMarketItem(state, action: PayloadAction<IBagCell>){
            state.selectedMarketItem = action.payload;
        },
        setFoodTax(state, action: PayloadAction<number>){
            state.foodTax = action.payload;
        },
        calculateBagSilver(state, action: PayloadAction<number>){
            state.backpackSilver += action.payload
        },
        buyMaterials(state, action: PayloadAction<IBagCell>){

            const addMaterial = (materialQuantity: number) => {
                const similarMaterial = state.backpackItems.find(item => item.itemId === action.payload.itemId && item.itemQuantity! < 999) as IBagCell;

                if (!!similarMaterial) {
                    const {itemQuantity: similarMatsQuantity} = similarMaterial;
                    let checkSum = similarMatsQuantity! + materialQuantity;
                    if (checkSum <= 999) {
                        similarMaterial.itemQuantity! += materialQuantity;
                    } else {
                        let rest = (similarMatsQuantity! + materialQuantity - 999);
                        similarMaterial.itemQuantity = 999;
                        addMaterial(rest);
                    }

                } else {
                    state.backpackItems.some((item, index) => {
                        if (item.itemId === null) {
                            state.backpackItems[index] = {...action.payload, itemQuantity: materialQuantity};

                            return true;
                        }
                    })
                }
            }

            addMaterial(action.payload.itemQuantity!)
        },
        craftItems(state, action: PayloadAction<{craftedItems: IBagCell, materialsInfo: TMaterialsInfo }>){

            const {
                consumedMaterials,
                materialApiId,
            } = action.payload.materialsInfo;

            const consumeMaterials = (itemId: string, consumedMaterialQuantity: number) => {
                state.backpackItems.some((item,index) => {
                    if (item.itemId === itemId){
                        if (item.itemQuantity! > consumedMaterialQuantity){
                            item.itemQuantity = item.itemQuantity! - consumedMaterialQuantity;

                            return true;
                        } else {
                            let rest = consumedMaterialQuantity - item.itemQuantity!;
                            state.backpackItems[index] = {...emptyBagCell};

                            consumeMaterials(itemId, rest);

                            return true;
                        }
                    }

                })
            }

            //проверяем на наличие потребленного ресурса и сопоставляем имя этой же переменной с телом переменной apiId через цикл и помещаем их в аргументы функции consumeMaterials если true
            for(const CMKey in consumedMaterials) {
                for(const MAIdKey in materialApiId){
                    if (!!consumedMaterials[CMKey as keyof TMaterialsInfo['consumedMaterials']] && CMKey.includes(MAIdKey.split('ApiId')[0])){
                        consumeMaterials(materialApiId[MAIdKey as keyof TMaterialsInfo['materialApiId']]!, consumedMaterials[CMKey as keyof TMaterialsInfo['consumedMaterials']]!)
                    }
                }
            }

            const addItem = (itemQuantity: number) => {
                const similarItem = state.backpackItems.find(item => item.itemId === action.payload.craftedItems.itemId && item.itemQuantity! < 999);

                if (!!similarItem){
                    const {itemQuantity: similarItemQuantity} = similarItem;
                    let checkSum = similarItemQuantity! + itemQuantity;
                    if (checkSum <= 999){
                        similarItem.itemQuantity! += itemQuantity;
                    } else {
                        let rest = (similarItemQuantity! + itemQuantity - 999);
                        similarItem.itemQuantity! = 999;
                        addItem(rest);
                    }
                } else {
                    if (itemQuantity <= 999){
                        state.backpackItems.some((item,index) => {
                            if (item.itemId === null){
                                state.backpackItems[index] = {...action.payload.craftedItems, itemQuantity}

                                return true;
                            }
                        })
                    } else {
                        const rest = itemQuantity - 999;
                        state.backpackItems.some((item, index) => {
                            if (item.itemId === null){
                                state.backpackItems[index] = {...action.payload.craftedItems, itemQuantity: 999}

                                return true;
                            }
                        })

                        addItem(rest);
                    }
                }
            }

            addItem(action.payload.craftedItems.itemQuantity!)
        },
        sellBagItems(state, action: PayloadAction<{index: number, quantity: number}>){
            if (state.backpackItems[action.payload.index].itemQuantity! !== action.payload.quantity && state.backpackItems[action.payload.index].itemQuantity! > 0) {
                state.backpackItems[action.payload.index].itemQuantity! -= action.payload.quantity
                return;
            }

            state.backpackItems[action.payload.index] = {...emptyBagCell};
        },
        swapItems(state, action: PayloadAction<{dragItemIndex: number, dropItemIndex: number, isShiftPressed: boolean}>){
            let buffer: IBagCell = {...state.backpackItems[action.payload.dragItemIndex]};
            let itemQuantity = Number(buffer.itemQuantity!);
            let checkSum = Number(state.backpackItems[action.payload.dragItemIndex].itemQuantity! + state.backpackItems[action.payload.dropItemIndex].itemQuantity!);

            if (action.payload.dragItemIndex === action.payload.dropItemIndex) return;

            if (state.backpackItems[action.payload.dragItemIndex].itemId !== state.backpackItems[action.payload.dropItemIndex].itemId){

                if (!action.payload.isShiftPressed) {

                    state.backpackItems[action.payload.dragItemIndex]! = {...state.backpackItems[action.payload.dropItemIndex]};
                    state.backpackItems[action.payload.dropItemIndex] = {...buffer};

                } else {

                    if (state.backpackItems[action.payload.dropItemIndex].itemId !== null){
                        return;

                    } else {
                        state.backpackItems[action.payload.dragItemIndex]!.itemQuantity = Math.ceil(Number(itemQuantity) / 2);

                        state.backpackItems[action.payload.dropItemIndex] = {...buffer};
                        state.backpackItems[action.payload.dropItemIndex].itemQuantity = Math.floor(Number(itemQuantity) / 2);
                    }

                }
            } else {
                if (!action.payload.isShiftPressed){

                    if(checkSum <= 999){
                        state.backpackItems[action.payload.dropItemIndex].itemQuantity! += state.backpackItems[action.payload.dragItemIndex].itemQuantity!;
                        state.backpackItems[action.payload.dragItemIndex] = {...emptyBagCell};
                    }

                    if (checkSum > 999){
                        state.backpackItems[action.payload.dropItemIndex].itemQuantity! = 999;
                        state.backpackItems[action.payload.dragItemIndex].itemQuantity! = checkSum - 999;
                    }

                } else {

                    if (state.backpackItems[action.payload.dropItemIndex].itemQuantity! + Math.floor(+state.backpackItems[action.payload.dragItemIndex].itemQuantity! / 2) <= 999){
                        state.backpackItems[action.payload.dropItemIndex].itemQuantity! += Math.floor(+state.backpackItems[action.payload.dragItemIndex].itemQuantity! / 2);
                        state.backpackItems[action.payload.dragItemIndex].itemQuantity! = Math.ceil(+state.backpackItems[action.payload.dragItemIndex].itemQuantity! / 2);

                    } else {
                        state.backpackItems[action.payload.dropItemIndex].itemQuantity! = 999;
                        state.backpackItems[action.payload.dragItemIndex].itemQuantity! = checkSum - 999;
                    }
                }

            }
        },
        addJournals(state,action: PayloadAction<{journalsQuantity: number, journalId: string, journalPrice: number}>){

            const fillJournals = (journalsQuantity: number) => {
                const similarFilledJournal = state.backpackItems.find(item => item.itemId === `${action.payload.journalId}_FULL` && item.itemQuantity! < 999);
                const similarPartiallyFullJournal = state.backpackItems.find(item => item.itemId === action.payload.journalId);
                let quantity = +journalsQuantity;

                if(!!similarPartiallyFullJournal){
                    quantity += +similarPartiallyFullJournal.itemQuantity!;

                    Object.assign(similarPartiallyFullJournal, emptyBagCell)
                }

                let roundedQuantity = Math.floor(+quantity);

                const nonIntegerRestQuantity = +quantity - +roundedQuantity;

                if (nonIntegerRestQuantity !== 0){
                    state.backpackItems.some(item => {
                        if (item.itemId === null){
                            item.itemId = action.payload.journalId;
                            item.itemQuantity = +nonIntegerRestQuantity.toFixed(2);
                            item.itemImage = `https://render.albiononline.com/v1/item/${action.payload.journalId}`

                            return true;
                        }
                    })

                    if (!similarPartiallyFullJournal){
                        state.backpackSilver -= +action.payload.journalPrice;
                    }
                }

                if (!!similarFilledJournal){
                    let checkSum = quantity + +similarFilledJournal.itemQuantity!;

                    if (checkSum <= 999){

                        similarFilledJournal.itemQuantity! += +roundedQuantity;

                        state.backpackSilver -= (+roundedQuantity - ((!nonIntegerRestQuantity && roundedQuantity > journalsQuantity) ? 1 : 0)) * +action.payload.journalPrice;

                    } else {
                        const integerQuantityRest = roundedQuantity - 999;

                        similarFilledJournal.itemQuantity! = 999;

                        state.backpackSilver -= (999 - ((!nonIntegerRestQuantity && roundedQuantity > journalsQuantity) ? 1 : 0)) * +action.payload.journalPrice;

                        fillJournals(integerQuantityRest);
                    }

                } else {
                    if (roundedQuantity <= 999){
                        if (roundedQuantity >= 1){
                            state.backpackItems.some(item => {
                                if (item.itemId === null){
                                    item.itemId = `${action.payload.journalId}_FULL`;
                                    item.itemQuantity! = roundedQuantity;
                                    item.itemImage = `https://render.albiononline.com/v1/item/${action.payload.journalId}_FULL`
                                    return true;
                                }
                            })
                            state.backpackSilver -= +roundedQuantity * +action.payload.journalPrice;
                        }
                    } else {
                        const integerQuantityRest = +roundedQuantity - 999;

                        state.backpackSilver -= 999 * +action.payload.journalPrice;

                        state.backpackItems.some(item => {
                            if (item.itemId === null){
                                item.itemId = `${action.payload.journalId}_FULL`;
                                item.itemQuantity = 999;
                                item.itemImage = `https://render.albiononline.com/v1/item/${action.payload.journalId}_FULL`

                                return true;
                            }
                        })

                        fillJournals(integerQuantityRest);
                    }
                }
            };

            fillJournals(action.payload.journalsQuantity);
        },
        sortBackpackItems(state){
            state.backpackItems.sort((item1, item2) => {
                if (item1.itemId! < item2.itemId!) return -1;
                if (item1.itemId! > item2.itemId!) return 1;

                if (item1.itemQuantity! > item2.itemQuantity!) return -1
                if (item1.itemQuantity! < item2.itemQuantity!) return 1;

                return 0;
            })
        },
        gatherBackpackItems(state){
            const items: IBagCell[] = [];

            state.backpackItems.filter(item => item.itemId !== null && item.itemQuantity! <= 999).forEach(item => {
                const id = item.itemId;

                if (!items.find(item => item.itemId === id)){
                    items.push({...item});
                } else {
                    items.find(item => item.itemId === id)!.itemQuantity! += +item.itemQuantity!;
                }
                item.itemQuantity = 0;
            });

            const addItem = (item: IBagCell) => {

                if (item.itemQuantity! > 999){
                    const rest = Number(item.itemQuantity!) - 999;

                    state.backpackItems.some((item1, index) => {
                        if (item1.itemId === item.itemId && item1.itemQuantity! < 999){
                            state.backpackItems[index] = {...item, itemQuantity: 999}

                            return true;
                        }
                    })

                    addItem({
                        ...item,
                        itemQuantity: +rest,
                    })
                } else {
                    state.backpackItems.some((item1, index) => {
                        if (item1.itemId === item.itemId && item1.itemQuantity! < 999){
                            state.backpackItems[index] = {...item};

                            return true;
                        }
                    });
                }
            }

            items.forEach(item => {
                addItem({...item});
            })
            state.backpackItems.forEach((item,index) => {
                if (item.itemQuantity === 0){
                    state.backpackItems[index] = {...emptyBagCell}
                }
            })
        },
        resetBackpack(state){
            state.backpackItems = initialState.backpackItems;
            state.backpackSilver = initialState.backpackSilver;
        },
    }
})

export const GMProfitSliceActions = GMProfitSlice.actions;
export default GMProfitSlice;