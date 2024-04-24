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

const WorkBenchButtons = () => {
    const workBenchTypeSelected = useSelector(selectWorkBenchType);
    const itemTypeSelected = useSelector(selectItemType);
    const dispatchAction = useAppDispatch();

    const setItemTypeHandler = (itemType: TItemTypeSelected) => {
        dispatchAction(GMProfitSliceActions.setItemTypeSelected(itemType));
        dispatchAction(interfaceSliceActions.setSelectedNodeIS(nodeOptions[workBenchTypeSelected][itemType]![0]))
    }
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