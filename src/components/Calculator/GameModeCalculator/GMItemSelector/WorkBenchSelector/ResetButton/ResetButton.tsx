import StyledResetButton from "../../../../StyledComponentsCommon/StyledResetButton";
import React, {useEffect} from "react";
import {nodeOptions, tierOptions} from "../../../../../../store/Options/CustomSelecrorsOptions";
import {useSelector} from "react-redux";
import {selectItemType, selectWorkBenchType} from "../../../../../../store/GMProfit/gm-profit-selectors";
import {useAppDispatch} from "../../../../../../store";
import {interfaceSliceActions} from "../../../../../../store/interface/interface-slice";
import {
    selectCalculatorType,
    selectInputIS,
    selectNodeIS,
    selectTierIS
} from "../../../../../../store/interface/interface-selector";

const ResetButton = () => {
    const calculatorType = useSelector(selectCalculatorType);

    const workBenchTypeSelected = useSelector(selectWorkBenchType);
    const itemTypeSelected = useSelector(selectItemType);

    const inputSearch = useSelector(selectInputIS);
    const selectedNode = useSelector(selectNodeIS);
    const selectedTier = useSelector(selectTierIS);

    const dispatchAction = useAppDispatch();

    const resetSelectorsHandler = () => {
        dispatchAction(interfaceSliceActions.setSelectedTierIS(tierOptions[0]));
        dispatchAction(interfaceSliceActions.setSelectedNodeIS(nodeOptions[workBenchTypeSelected][itemTypeSelected]![0]));
        dispatchAction(interfaceSliceActions.setInputSearchIS(''));
    }

    useEffect(() => {
        resetSelectorsHandler();
    }, [workBenchTypeSelected, itemTypeSelected, calculatorType]);

    const wereInputsChanged = () => {
        return (
            selectedTier.value !== tierOptions[0].value
            || selectedNode.value !== nodeOptions[workBenchTypeSelected][itemTypeSelected]![0].value
            || inputSearch.length > 0
        );
    }

    return (
        <>
            {wereInputsChanged() &&
                <StyledResetButton
                    $top={3}
                    $right={5}
                    onClick={() => resetSelectorsHandler()}
                />}
        </>
    )
}

export default ResetButton;