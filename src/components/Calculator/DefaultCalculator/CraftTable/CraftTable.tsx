import {useSelector} from "react-redux";
import {profitSliceActions} from "../../../../store/profit/profit-slice";

import styles from './CraftTable.module.scss'

import {useAppDispatch} from "../../../../store";
import {selectLanguage} from "../../../../store/language/language-selector";

import StyledCraftTableWrapper from "./CraftTableSC/StyledCraftTableWrapper";
import StyledThumb from "../../StyledComponentsCommon/StyledThumb";
import {memo} from "react";
import ItemTable from "./Tables/ItemTable";
import ResourceTable from "./Tables/ResourceTable";
import CraftTableButton from "./Buttons/CraftTableButton";
import {TCalcProps} from "../../../../types/calculatorPropsType";
import ConsumablesList from "./ConsumablesList/ConsumablesList";

const CraftTable = memo(({calculatorType}: {calculatorType: TCalcProps}) => {

    const dispatchAction = useAppDispatch();

    const {selectedLanguage, language} = useSelector(selectLanguage);
    const {craftTableStrings} = language;

    const deleteLiHandler = (calculatorType: TCalcProps, id: string) => {
        dispatchAction(profitSliceActions.deleteLiFunction({calculatorType, id}));
    }

    const tableProps = {
        craftTableStrings,
        calculatorType,
        deleteLiHandler,
    }

    const selectTableType = () => {
        switch (calculatorType) {
            case "ITEMS":
                return <ItemTable {...tableProps} />;
            case "RESOURCES":
                return <ResourceTable {...tableProps} />;
            case 'FOOD':
            case "POTIONS":
                return <ConsumablesList {...tableProps} selectedLanguage={selectedLanguage}/>;
        }
    }

    return <StyledCraftTableWrapper>
        <CraftTableButton />

        <StyledThumb>
            <div className={styles.craftTableStyles}>

                { selectTableType() }

            </div>
        </StyledThumb>
    </StyledCraftTableWrapper>
})

export default CraftTable;