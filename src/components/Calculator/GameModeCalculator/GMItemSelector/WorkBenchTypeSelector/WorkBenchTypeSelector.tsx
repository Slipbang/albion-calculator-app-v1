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
import {selectCalculatorType, selectGuide} from "../../../../../store/interface/interface-selector";
import classNames from "classnames/bind";

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
    RESOURCES: [
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
    ITEMS: [
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
    POTIONS: [],
    FOOD: []
}

const WorkBenchTypeSelector = () => {
    const calculatorType = useSelector(selectCalculatorType);
    const {script} = useSelector(selectGuide);
    const workBenchTypeButtonRef = useRef<HTMLButtonElement>(null);
    const dispatchAction = useAppDispatch();
    const workBenchTypeSelected = useSelector(selectWorkBenchType);
    const prevValues = useRef<{calculatorType: string | null; script: number | null;}>({ calculatorType: null, script: null });

    const selectWorkBenchTypeHandler = (workBenchType: ICraftingItemClass, workBenchAvatar: string, workBenchWorkerAvatar: string,) => {
        dispatchAction(interfaceSliceActions.setIsCraftingFormVisible(false));
        dispatchAction(GMProfitSliceActions.setWorkBenchTypeSelected({
            workBenchType,
            workBenchAvatar,
            workBenchWorkerAvatar,
        }));

        let itemType: TItemTypeSelected;

        if (calculatorType === 'RESOURCES') {
            itemType = 'resources';
        } else {
            if (workBenchType === 'toolmaker') {
                itemType = 'tools';
            } else {
                itemType = 'weapon';
            }
        }

        dispatchAction(GMProfitSliceActions.setItemTypeSelected(itemType));
    }

    const extendedClassNames = classNames.bind(styles);

    const workBenchTypeSelector = extendedClassNames(styles.workBenchTypeSelector, {
        [styles.workBenchTypeSelectorHoverImitation]: script === 8,
    })

    useEffect(() => {
        if (
            calculatorType !== prevValues.current.calculatorType &&
            (calculatorType === 'RESOURCES' || calculatorType === 'ITEMS')
        ) {
            workBenchTypeButtonRef.current?.click();
        }

        if (script !== prevValues.current.script && script === 9) {
            const { workBenchType, workBenchAvatar, workerAvatar } = workBenchNodeSelectorButtons['ITEMS'][1];
            selectWorkBenchTypeHandler(workBenchType, workBenchAvatar, workerAvatar);
        }

        prevValues.current = { calculatorType, script };
    }, [calculatorType, script]);

    return (
        <div className={workBenchTypeSelector} data-selected={calculatorType}>
            {workBenchNodeSelectorButtons[calculatorType].map((button, index) => {
                const {
                    workBenchType,
                    workBenchAvatar,
                    workerAvatar,
                    buttonImage,
                    selectedButtonImage,
                } = button;

                return (
                    <StyledWorkBenchTypeButton
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
                )
            })}
        </div>
    )
}

export default WorkBenchTypeSelector;