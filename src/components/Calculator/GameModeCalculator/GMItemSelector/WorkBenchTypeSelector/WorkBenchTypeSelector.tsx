import StyledWorkBenchTypeButton from "../GMItemSelectorSC/StyledWorkBenchTypeButton";
import React, {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {selectWorkBenchType} from "../../../../../store/GMProfit/gm-profit-selectors";
import {interfaceSliceActions} from "../../../../../store/interface/interface-slice";
import {useAppDispatch} from "../../../../../store";
import styles from './WorkBenchTypeSelector.module.scss';

import {
    forgeAvatar,
    houseAvatar,
    hunterAvatar,
    lumbermillAvatar,
    lumbermillWorkerAvatar,
    mageAvatar,
    smelterAvatar,
    smelterWorkerAvatar,
    stonemasonAvatar,
    stonemasonWorkerAvatar,
    tannerAvatar,
    tannerWorkerAvatar,
    toolmakerAvatar,
    toolmakerWorkshopAvatar,
    towerAvatar,
    warriorAvatar,
    weaverAvatar,
    weaverWorkerAvatar,
    workBenchForgeButton,
    workBenchForgeButtonInactive,
    workBenchHunterHouseButton,
    workBenchHunterHouseButtonInactive,
    workBenchLumbermillButton,
    workBenchLumbermillButtonInactive,
    workBenchMageTowerButton,
    workBenchMageTowerButtonInactive,
    workBenchSmelterButton,
    workBenchSmelterButtonInactive,
    workBenchStonemasonButton,
    workBenchStonemasonButtonInactive,
    workBenchTannerButton,
    workBenchTannerButtonInactive,
    workBenchToolmakerButton,
    workBenchToolmakerButtonInactive,
    workBenchWeaverButton,
    workBenchWeaverButtonInactive
} from "../GMItemSelectorImgReexports/GMItemSelectorImgReexports";

import {TCalcProps} from "../../../../../types/calculatorPropsType";
import {GMProfitSliceActions,} from "../../../../../store/GMProfit/gm-profit-slice";
import {ICraftingItemClass, TItemTypeSelected} from "../../../../../types/craftItemsType";
import {selectCalculatorType} from "../../../../../store/interface/interface-selector";

interface IWorkBenchButton {
    workBenchType: ICraftingItemClass;
    buttonImage: string;
    selectedButtonImage: string;
    workBenchAvatar: string;
    workerAvatar: string;
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
        },
        {
            workBenchType: 'weaver',
            buttonImage: workBenchWeaverButtonInactive,
            selectedButtonImage: workBenchWeaverButton,
            workBenchAvatar: weaverAvatar,
            workerAvatar: weaverWorkerAvatar,
        },
        {
            workBenchType: 'lumbermill',
            buttonImage: workBenchLumbermillButtonInactive,
            selectedButtonImage: workBenchLumbermillButton,
            workBenchAvatar: lumbermillAvatar,
            workerAvatar: lumbermillWorkerAvatar,
        },
        {
            workBenchType: 'smelter',
            buttonImage: workBenchSmelterButtonInactive,
            selectedButtonImage: workBenchSmelterButton,
            workBenchAvatar: smelterAvatar,
            workerAvatar: smelterWorkerAvatar,
        },
        {
            workBenchType: 'stonemason',
            buttonImage: workBenchStonemasonButtonInactive,
            selectedButtonImage: workBenchStonemasonButton,
            workBenchAvatar: stonemasonAvatar,
            workerAvatar: stonemasonWorkerAvatar,
        }
    ],
    'items': [
        {
            workBenchType: 'warrior',
            buttonImage: workBenchForgeButtonInactive,
            selectedButtonImage: workBenchForgeButton,
            workBenchAvatar: forgeAvatar,
            workerAvatar: warriorAvatar,
        },
        {
            workBenchType: 'hunter',
            buttonImage: workBenchHunterHouseButtonInactive,
            selectedButtonImage: workBenchHunterHouseButton,
            workBenchAvatar: houseAvatar,
            workerAvatar: hunterAvatar,
        },
        {
            workBenchType: 'mage',
            buttonImage: workBenchMageTowerButtonInactive,
            selectedButtonImage: workBenchMageTowerButton,
            workBenchAvatar: towerAvatar,
            workerAvatar: mageAvatar,
        },
        {
            workBenchType: 'toolmaker',
            buttonImage: workBenchToolmakerButtonInactive,
            selectedButtonImage: workBenchToolmakerButton,
            workBenchAvatar: toolmakerWorkshopAvatar,
            workerAvatar: toolmakerAvatar,
        },

    ],
    'potions': [],
    'food': []
}

const WorkBenchTypeSelector = () => {
    const calculatorType = useSelector(selectCalculatorType);
    const workBenchTypeButtonRef = useRef<HTMLButtonElement>(null);
    const dispatchAction = useAppDispatch();

    useEffect(() => {
        workBenchTypeButtonRef.current!.click();
    }, [calculatorType]);

    const workBenchTypeSelected = useSelector(selectWorkBenchType);


    const selectWorkBenchTypeHandler = (workBenchType: ICraftingItemClass, workBenchAvatar: string, workBenchWorkerAvatar: string,) => {
        dispatchAction(interfaceSliceActions.setIsCraftingFormVisible(false));
        dispatchAction(GMProfitSliceActions.setWorkBenchTypeSelected({
            workBenchType,
            workBenchAvatar,
            workBenchWorkerAvatar,
        }));

        let itemType: TItemTypeSelected;

        if (calculatorType === 'resource') {
            itemType = 'resources';
        } else {
            if (workBenchType !== 'toolmaker') {
                itemType = 'weapon';
            } else {
                itemType = 'tools';
            }
        }

        dispatchAction(GMProfitSliceActions.setItemTypeSelected(itemType));
    }

    return <div className={styles.workBenchTypeSelector} data-selected={calculatorType}>
        {workBenchNodeSelectorButtons[calculatorType].map((button, index) => {
            const {
                workBenchType,
                workBenchAvatar,
                workerAvatar,
                buttonImage,
                selectedButtonImage,
            } = button;

            return <StyledWorkBenchTypeButton
                key={workBenchType}
                title={workBenchType}
                ref={index === 0 ? workBenchTypeButtonRef : undefined}
                $isSelected={workBenchTypeSelected === workBenchType}
                $buttonImage={buttonImage}
                $selectedButtonImage={selectedButtonImage}
                onClick={() => {
                    selectWorkBenchTypeHandler(workBenchType, workBenchAvatar, workerAvatar);
                }}
            />
        })}
    </div>
}

export default WorkBenchTypeSelector;