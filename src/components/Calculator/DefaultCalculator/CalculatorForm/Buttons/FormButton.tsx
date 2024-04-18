import StyledDefaultButton from "../../../StyledComponentsCommon/StyledDefaultButton";
import React from "react";
import {interfaceSliceActions} from "../../../../../store/interface/interface-slice";
import {profitSliceActions} from "../../../../../store/profit/profit-slice";
import {TCalcProps} from "../../../../../types/calculatorPropsType";
import {useAppDispatch} from "../../../../../store";

interface IFormButtonProps {
    calculatorType: TCalcProps;
}

const FormButton = (props: IFormButtonProps) => {
    const {calculatorType} = props;

    const dispatchAction = useAppDispatch();

    const calculateProfitHandler = () => {
        dispatchAction(profitSliceActions.getResourceProfitHandler({calculatorType}));

        if (calculatorType === 'items' || calculatorType === 'resource'){
            dispatchAction(interfaceSliceActions.toggleCraftTableVisibility(true));
        }

        if (calculatorType === 'food' || calculatorType === 'potions'){
            dispatchAction(interfaceSliceActions.setInfoTableVisibility(true));
        }
    }

    return (
        <StyledDefaultButton
            $width={81}
            $height={27}
            style={{marginLeft: '10px',marginTop: '15px', fontSize: '13px'}}
            onClick={() => calculateProfitHandler()}
        >
            {(calculatorType === 'items' || calculatorType === 'resource') ? 'Calculate' : 'info'}
        </StyledDefaultButton>
    )
}

export default FormButton;