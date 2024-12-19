import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {interfaceSliceActions} from "../../../../store/interface/interface-slice";
import {GMProfitSliceActions} from "../../../../store/GMProfit/gm-profit-slice";

type TAction = [ActionCreatorWithPayload<any>, any]

export interface IActions {
    actions: TAction[]
}

export type TActionSequence = IActions[];

const {
    setGuideScript,
    setGuidePosition,
    toggleMarketMenuShown,
    setInputSearchMM,
    setMarketItemVisibility,
    setInputSearchIS,
    setIsCraftingFormVisible,
    resetMarketMenuSelectors,
} = interfaceSliceActions;
const {
    setMarketTypeAction,
} = GMProfitSliceActions;

export const guideActions: TActionSequence = [
    {
        actions: [[setGuideScript, 1], [toggleMarketMenuShown, false], ],
    },
    {
        actions: [[setGuideScript, 2], [setGuidePosition, 'right'], [toggleMarketMenuShown, true], [setMarketTypeAction, 'buy'], ],
    },
    {
        actions: [[setGuideScript, 3], [setInputSearchMM, 'T6_LEATHER_LEVEL1@1'], ],
    },
    {
        actions: [[setGuideScript, 4], ],
    },
    {
        actions: [[setGuideScript, 5], ],
    },
    {
        actions: [[setGuideScript, 6], ],
    },
    {
        actions: [[setGuideScript, 7], [setMarketItemVisibility, false], [setGuidePosition, 'center'], ],
    },
    {
        actions: [[setGuideScript, 8], ],
    },
    {
        actions: [[setGuideScript, 9], ],
    },
    {
        actions: [[setGuideScript, 10], ],
    },
    {
        actions: [[setGuideScript, 11], [setInputSearchIS, 'T6_ARMOR_LEATHER_MORGANA'], ],
    },
    {
        actions: [[setGuideScript, 12], [setGuidePosition, 'left'], ],
    },
    {
        actions: [[setGuideScript, 13], ],
    },
    {
        actions: [[setGuideScript, 14], ],
    },
    {
        actions: [[setGuideScript, 15], ],
    },
    {
        actions: [[setGuideScript, 16], ],
    },
    {
        actions: [[setGuideScript, 17], ],
    },
    {
        actions: [[setGuideScript, 18], ],
    },
    {
        actions: [[setGuideScript, 19], [setIsCraftingFormVisible, false], [resetMarketMenuSelectors, undefined], [setMarketTypeAction, 'sell'], [setGuidePosition, 'right'], ],
    },
    {
        actions: [[setGuideScript, 20], ],
    },
    {
        actions: [[setGuideScript, 21], ],
    },
    {
        actions: [[setGuideScript, 22], ],
    },
    {
        actions: [[setGuideScript, 23], [toggleMarketMenuShown, false], [setGuidePosition, 'center'], ],
    },
    {
        actions: [[setGuideScript, 24], ],
    },
];
