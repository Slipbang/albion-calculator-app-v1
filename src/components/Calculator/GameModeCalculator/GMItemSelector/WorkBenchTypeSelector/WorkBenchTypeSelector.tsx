import StyledWorkBenchTypeButton from "../GMItemSelectorSC/StyledWorkBenchTypeButton";
import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {selectWorkBenchType} from "../../../../../store/GMProfit/gm-profit-selectors";
import {interfaceSliceActions} from "../../../../../store/interface/interface-slice";
import {useAppDispatch} from "../../../../../store";
import styles from './WorkBenchTypeSelector.module.scss';

import {
    forgeAvatar, houseAvatar, hunterAvatar,
    lumbermillAvatar,
    lumbermillWorkerAvatar, mageAvatar,
    smelterAvatar,
    smelterWorkerAvatar,
    stonemasonAvatar,
    stonemasonWorkerAvatar,
    tannerAvatar,
    tannerWorkerAvatar, toolmakerAvatar, toolmakerWorkshopAvatar, towerAvatar,
    warriorAvatar,
    weaverAvatar,
    weaverWorkerAvatar,
    workBenchForgeButton,
    workBenchForgeButtonInactive,
    workBenchHunterHouseButton,
    workBenchHunterHouseButtonInactive,
    workBenchLumbermillButton,
    workBenchLumbermillButtonInactive, workBenchMageTowerButton, workBenchMageTowerButtonInactive,
    workBenchSmelterButton,
    workBenchSmelterButtonInactive,
    workBenchStonemasonButton,
    workBenchStonemasonButtonInactive,
    workBenchTannerButton,
    workBenchTannerButtonInactive, workBenchToolmakerButton, workBenchToolmakerButtonInactive,
    workBenchWeaverButton,
    workBenchWeaverButtonInactive
} from "../GMItemSelectorImgReexports/GMItemSelectorImgReexports";
import {
    clothItems,
    leatherItems,
    metalbarItems,
    planksItems,
    stoneBlockItems
} from "../../../../../store/Items/materials";
import {
    huntersCraftItems,
    mageCraftItems, TCraftItems,
    toolmakerCraftItems,
    warriorCraftItems
} from "../../../../../store/Items/craftItems";
import {TCalcProps} from "../../../../../types/calculatorPropsType";
import {
    GMProfitSliceActions,
} from "../../../../../store/GMProfit/gm-profit-slice";
import {ICraftingItemClass, TItemTypeSelected} from "../../../../../types/craftItemsType";

interface IWorkBenchButton {
    workBenchType: ICraftingItemClass;
    buttonImage: string;
    selectedButtonImage: string;
    workBenchAvatar: string;
    workerAvatar: string;
    craftItems: TCraftItems[];
}

type TWorkBenchNodeSelectorButtons = {
    [key in TCalcProps]: IWorkBenchButton[]
}

const workBenchNodeSelectorButtons: TWorkBenchNodeSelectorButtons = {
    'resource': [
        {
            workBenchType: 'tanner',
            buttonImage: workBenchTannerButtonInactive,
            selectedButtonImage: workBenchTannerButton,
            workBenchAvatar: tannerAvatar,
            workerAvatar: tannerWorkerAvatar,
            craftItems: leatherItems,
        },
        {
            workBenchType: 'weaver',
            buttonImage: workBenchWeaverButtonInactive,
            selectedButtonImage: workBenchWeaverButton,
            workBenchAvatar: weaverAvatar,
            workerAvatar: weaverWorkerAvatar,
            craftItems: clothItems,
        },
        {
            workBenchType: 'lumbermill',
            buttonImage: workBenchLumbermillButtonInactive,
            selectedButtonImage: workBenchLumbermillButton,
            workBenchAvatar: lumbermillAvatar,
            workerAvatar: lumbermillWorkerAvatar,
            craftItems: planksItems,
        },
        {
            workBenchType: 'smelter',
            buttonImage: workBenchSmelterButtonInactive,
            selectedButtonImage: workBenchSmelterButton,
            workBenchAvatar: smelterAvatar,
            workerAvatar: smelterWorkerAvatar,
            craftItems: metalbarItems,
        },
        {
            workBenchType: 'stonemason',
            buttonImage: workBenchStonemasonButtonInactive,
            selectedButtonImage: workBenchStonemasonButton,
            workBenchAvatar: stonemasonAvatar,
            workerAvatar: stonemasonWorkerAvatar,
            craftItems: stoneBlockItems,
        }
    ],
    'items': [
        {
            workBenchType: 'warrior',
            buttonImage: workBenchForgeButtonInactive,
            selectedButtonImage: workBenchForgeButton,
            workBenchAvatar: forgeAvatar,
            workerAvatar: warriorAvatar,
            craftItems: warriorCraftItems,
        },
        {
            workBenchType: 'hunter',
            buttonImage: workBenchHunterHouseButtonInactive,
            selectedButtonImage: workBenchHunterHouseButton,
            workBenchAvatar: houseAvatar,
            workerAvatar: hunterAvatar,
            craftItems: huntersCraftItems,
        },
        {
            workBenchType: 'mage',
            buttonImage: workBenchMageTowerButtonInactive,
            selectedButtonImage: workBenchMageTowerButton,
            workBenchAvatar: towerAvatar,
            workerAvatar: mageAvatar,
            craftItems: mageCraftItems,
        },
        {
            workBenchType: 'toolmaker',
            buttonImage: workBenchToolmakerButtonInactive,
            selectedButtonImage: workBenchToolmakerButton,
            workBenchAvatar: toolmakerWorkshopAvatar,
            workerAvatar: toolmakerAvatar,
            craftItems: toolmakerCraftItems,
        },

    ],
    'potions': [],
    'food': []
}

const WorkBenchTypeSelector = ({calculatorType}: {calculatorType: TCalcProps}) => {

    const workBenchTypeButtonRef = useRef<HTMLButtonElement>(null);
    const dispatchAction = useAppDispatch();

    useEffect(() => {
        workBenchTypeButtonRef.current!.click();
    }, [calculatorType]);


    const [isWorkBenchTypeSelectorShown, setIsWorkBenchTypeSelectorShown] = useState(false);
    const workBenchTypeSelected = useSelector(selectWorkBenchType);


    const selectWorkBenchTypeHandler = (workBenchType: ICraftingItemClass, workBenchAvatar: string, workBenchWorkerAvatar: string, craftingItems: TCraftItems[],) => {
        dispatchAction(interfaceSliceActions.setIsCraftingFormVisible(false));
        dispatchAction(GMProfitSliceActions.setWorkBenchTypeSelected({
            workBenchType,
            workBenchAvatar,
            workBenchWorkerAvatar,
            craftingItems,
        }));

        let itemType: TItemTypeSelected;

        if (calculatorType === 'resource'){
            itemType = 'resources';
        } else {
            if (workBenchType !== 'toolmaker'){
                itemType = 'weapon';
            } else {
                itemType = 'tools';
            }
        }

        dispatchAction(GMProfitSliceActions.setItemTypeSelected(itemType));
    }

    return <div
        onMouseEnter={() => {
            setIsWorkBenchTypeSelectorShown(true);
        }}
        onMouseLeave={() => {
            setIsWorkBenchTypeSelectorShown(false);
        }}
        className={isWorkBenchTypeSelectorShown ? styles.workBenchTypeSelectorShown : styles.workBenchTypeSelectorHidden}
        style={{width: `${!isWorkBenchTypeSelectorShown ? 50 : calculatorType === 'items' ? 210 : 260}px`}}
    >
        {workBenchNodeSelectorButtons[calculatorType].map((button, index) => {
            const {
                workBenchType,
                workBenchAvatar,
                workerAvatar,
                buttonImage,
                selectedButtonImage,
                craftItems
            } = button;

            return <StyledWorkBenchTypeButton
                key={workBenchType}
                title={workBenchType}
                ref={index === 0 ? workBenchTypeButtonRef : undefined}
                $isSelected={workBenchTypeSelected === workBenchType}
                $buttonImage={buttonImage}
                $selectedButtonImage={selectedButtonImage}
                $isSelectorShown={isWorkBenchTypeSelectorShown}
                onClick={() => {
                    selectWorkBenchTypeHandler(workBenchType, workBenchAvatar, workerAvatar, craftItems);
                }}
            />
        })}
    </div>
}

export default WorkBenchTypeSelector;