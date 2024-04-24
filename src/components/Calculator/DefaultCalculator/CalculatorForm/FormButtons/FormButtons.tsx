import StyledDefaultButton from "../../../StyledComponentsCommon/StyledDefaultButton";
import React from "react";
import {interfaceSliceActions} from "../../../../../store/interface/interface-slice";
import {profitSliceActions} from "../../../../../store/profit/profit-slice";
import {TCalcProps} from "../../../../../types/calculatorPropsType";
import {useAppDispatch} from "../../../../../store";

interface IFormButtonProps {
    calculatorType: TCalcProps;
}

const FormButtons = (props: IFormButtonProps) => {
    const {calculatorType} = props;

    const dispatchAction = useAppDispatch();

    const calculateProfitHandler = () => {
        dispatchAction(profitSliceActions.getResourceProfitHandler({calculatorType}));
        dispatchAction(interfaceSliceActions.toggleCraftTableVisibility(true));
    }

    const calculateConsumables = () => {
        dispatchAction(profitSliceActions.showConsumablesCalculations());
        dispatchAction(interfaceSliceActions.setInfoTableVisibility(true));
    }

    return (
        <>
            <StyledDefaultButton
                $width={81}
                $height={27}
                style={{marginLeft: '10px',marginTop: '15px', fontSize: '13px'}}
                onClick={() => calculateProfitHandler()}
            >
                {(calculatorType === 'ITEMS' || calculatorType === 'RESOURCES') ? 'Calculate' : 'Save'}
            </StyledDefaultButton>

            {(calculatorType === 'POTIONS' || calculatorType === 'FOOD') && (
                <StyledDefaultButton
                    $width={81}
                    $height={27}
                    style={{marginLeft: '10px',marginTop: '15px', fontSize: '13px'}}
                    onClick={() => calculateConsumables()}
                >Info</StyledDefaultButton>
            )}
        </>
    )
}

export default FormButtons;