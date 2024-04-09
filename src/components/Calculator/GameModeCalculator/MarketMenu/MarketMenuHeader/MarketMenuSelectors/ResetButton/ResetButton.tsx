import StyledResetButton from "../../../../../StyledComponentsCommon/StyledResetButton";
import {enchantmentOptions, tierOptions, typeOptions} from "../../../../../../../store/Options/CustomSelecrorsOptions";
import {useSelector} from "react-redux";
import {
    selectEnchantmentMM, selectInputMM,
    selectItemTypeMM,
    selectTierMM
} from "../../../../../../../store/interface/interface-selector";
import {useAppDispatch} from "../../../../../../../store";
import {interfaceSliceActions} from "../../../../../../../store/interface/interface-slice";

const ResetButton = () => {
    const dispatchAction = useAppDispatch();

    const selectedTier = useSelector(selectTierMM);
    const selectedItemType = useSelector(selectItemTypeMM);
    const selectedEnchantment = useSelector(selectEnchantmentMM);
    const inputSearch = useSelector(selectInputMM);

    const resetSelectorsHandler = () => dispatchAction(interfaceSliceActions.resetMarketMenuSelectors());

    const wereInputsChanged = () => {
        return selectedTier.value !== tierOptions[0].value
            || selectedEnchantment.value !== enchantmentOptions[0].value
            || selectedItemType.value !== typeOptions[0].value
            || inputSearch.length > 0
    }

    return (
        <>
            {wereInputsChanged() && <StyledResetButton $top={3} $right={4} onClick={() => resetSelectorsHandler()}/>}
        </>
    )
}

export default ResetButton;