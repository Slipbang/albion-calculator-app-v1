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
import {selectCalculatorType} from "../../../../store/interface/interface-selector";


const CraftTable = React.memo(() => {
    const calculatorType = useSelector(selectCalculatorType);

    const dispatchAction = useAppDispatch();

    const {language} = useSelector(selectLanguage);
    const {craftTableStrings} = language;

    const deleteLiHandler = (type: string, id: string) => {
        dispatchAction(profitSliceActions.deleteLiFunction({type, id}));
    }

    return <StyledCraftTableWrapper>
        <CraftTableButton />

        <StyledThumb>
            <div className={styles.craftTableStyles}>
                {calculatorType === "resource" &&
                    <ResourceTable
                        craftTableStrings={craftTableStrings}
                        calculatorType={calculatorType}
                        deleteLiHandler={deleteLiHandler}
                    />
                }

                {calculatorType === "items" &&
                    <ItemTable
                        craftTableStrings={craftTableStrings}
                        deleteLiHandler={deleteLiHandler}
                        calculatorType={calculatorType}
                    />
                }
            </div>
        </StyledThumb>
    </StyledCraftTableWrapper>
})

export default CraftTable;