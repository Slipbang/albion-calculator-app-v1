import {useSelector} from "react-redux";
import {profitSliceActions} from "../../../../store/profit/profit-slice";

import styles from './CraftTable.module.scss'

import {useAppDispatch} from "../../../../store";
import {selectLanguage} from "../../../../store/language/language-selector";

import StyledCraftTableWrapper from "./CraftTableSC/StyledCraftTableWrapper";
import StyledThumb from "../../StyledComponentsCommon/StyledThumb";
import React from "react";
import ItemTable from "./Tables/ItemTable";
import ResourceTable from "./Tables/ResourceTable";
import CraftTableButton from "./Buttons/CraftTableButton";
import {TCalcProps} from "../../../../types/calculatorPropsType";
import ConsumablesList from "./ConsumablesList/ConsumablesList";


const CraftTable = React.memo(({calculatorType}: {calculatorType: TCalcProps}) => {

    const dispatchAction = useAppDispatch();

    const {language, selectedLanguage} = useSelector(selectLanguage);
    const {craftTableStrings} = language;

    const deleteLiHandler = (type: TCalcProps, id: string) => {
        dispatchAction(profitSliceActions.deleteLiFunction({type, id}));
    }

    return <StyledCraftTableWrapper>
        <CraftTableButton />

        <StyledThumb>
            <div className={styles.craftTableStyles}>
                {calculatorType === "resource" && (
                    <ResourceTable
                        craftTableStrings={craftTableStrings}
                        calculatorType={calculatorType}
                        deleteLiHandler={deleteLiHandler}
                    />
                )}

                {calculatorType === "items" && (
                    <ItemTable
                        craftTableStrings={craftTableStrings}
                        deleteLiHandler={deleteLiHandler}
                        calculatorType={calculatorType}
                    />
                )}
                {(calculatorType === 'food' || calculatorType === 'potions') && (
                    <ConsumablesList
                        craftTableStrings={craftTableStrings}
                        deleteLiHandler={deleteLiHandler}
                        calculatorType={calculatorType}
                        selectedLanguage={selectedLanguage}
                    />
                )}
            </div>
        </StyledThumb>
    </StyledCraftTableWrapper>
})

export default CraftTable;