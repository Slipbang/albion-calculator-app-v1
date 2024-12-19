import StyledWorkBenchButton from "../GMItemSelectorSC/StyledWorkBenchButton";
import {
    workBenchAccessoriesCraftingButton, workBenchAccessoriesCraftingButtonActive,
    workBenchArmorCraftingButton, workBenchArmorCraftingButtonActive,
    workBenchToolsCraftingButton, workBenchToolsCraftingButtonActive,
    workBenchWeaponCraftingButton, workBenchWeaponCraftingButtonActive
} from "../GMItemSelectorImgReexports/GMItemSelectorImgReexports";
import {useSelector} from "react-redux";
import {selectItemType, selectWorkBenchType} from "../../../../../store/GMProfit/gm-profit-selectors";
import {GMProfitSliceActions} from "../../../../../store/GMProfit/gm-profit-slice";
import {nodeOptions} from "../../../../../store/Options/CustomSelecrorsOptions";
import {useAppDispatch} from "../../../../../store";
import {interfaceSliceActions} from "../../../../../store/interface/interface-slice";
import {TItemTypeSelected} from "../../../../../types/craftItemsType";
import {useEffect, useRef} from "react";
import {selectGuide} from "../../../../../store/interface/interface-selector";

const WorkBenchButtons = () => {
    const workBenchTypeSelected = useSelector(selectWorkBenchType);
    const itemTypeSelected = useSelector(selectItemType);
    const {script} = useSelector(selectGuide);
    const armourButtonRef = useRef<HTMLButtonElement>(null);
    const dispatchAction = useAppDispatch();

    const setItemTypeHandler = (itemType: TItemTypeSelected) => {
        dispatchAction(GMProfitSliceActions.setItemTypeSelected(itemType));
        dispatchAction(interfaceSliceActions.setSelectedNodeIS(nodeOptions[workBenchTypeSelected][itemType]![0]))
    }

    useEffect(() => {
        if (script === 9) {
            setTimeout(() => armourButtonRef.current?.click(), 0);
        }
    }, [script])

    return (
        <>
            <StyledWorkBenchButton
                $buttonImg={workBenchTypeSelected !== 'toolmaker' ? workBenchWeaponCraftingButton : workBenchToolsCraftingButton}
                $hoverImg={workBenchTypeSelected !== 'toolmaker' ? workBenchWeaponCraftingButtonActive : workBenchToolsCraftingButtonActive}
                $top={207}
                $left={317}
                $isSelected={itemTypeSelected === 'weapon' || itemTypeSelected === 'tools'}
                onClick={() => setItemTypeHandler(workBenchTypeSelected !== 'toolmaker' ? 'weapon' : 'tools')}
            />
            <StyledWorkBenchButton
                ref={armourButtonRef}
                $buttonImg={workBenchArmorCraftingButton}
                $hoverImg={workBenchArmorCraftingButtonActive}
                $top={300}
                $left={317}
                $isSelected={itemTypeSelected === 'armor'}
                onClick={() => setItemTypeHandler('armor')}
            />
            {workBenchTypeSelected === 'toolmaker' && (
                <StyledWorkBenchButton
                    $buttonImg={workBenchAccessoriesCraftingButton}
                    $hoverImg={workBenchAccessoriesCraftingButtonActive}
                    $top={393}
                    $left={317}
                    $isSelected={itemTypeSelected === 'accessories'}
                    onClick={() => setItemTypeHandler('accessories')}
                />
            )}
        </>
    )
}

export default WorkBenchButtons;