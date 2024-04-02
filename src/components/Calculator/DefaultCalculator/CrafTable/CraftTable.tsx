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
import {IQueryItemsParams} from "../../../../store/api/api";

interface ICraftTableProps {
    fetchItemsData?: ({itemsParams, isBlackMarket}: IQueryItemsParams) => void;
    fetchMaterialsData?: ({itemsParams, isBlackMarket}: IQueryItemsParams) => void;
    fetchArtefactsData?: ({itemsParams, isBlackMarket}: IQueryItemsParams) => void;
    fetchJournalsData?: ({itemsParams, isBlackMarket}: IQueryItemsParams) => void;
}

const CraftTable = React.memo((props: ICraftTableProps) => {
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
                        alertTableStyles={styles.alertTable}
                        calculatorType={calculatorType}
                        deleteLiHandler={deleteLiHandler}
                        fetchMaterialsData={props.fetchMaterialsData}
                    />
                }

                {calculatorType === "items" &&
                    <ItemTable
                        alertTableStyles={styles.alertTable}
                        craftTableStrings={craftTableStrings}
                        deleteLiHandler={deleteLiHandler}
                        calculatorType={calculatorType}
                        {...props}
                    />
                }
            </div>
        </StyledThumb>
    </StyledCraftTableWrapper>
})

export default CraftTable;