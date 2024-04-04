import styles from './DefaultCalculator.module.scss'
import CalculatorForm from "./CalculatorForm/CalculatorForm";
import CraftTable from "./CrafTable/CraftTable";
import {useSelector} from "react-redux";
import {
    selectCraftTableVisibility,
    selectGameMode,
    selectInfoTableVisibility
} from "../../../store/interface/interface-selector";
import InfoTable from "./InfoTable/InfoTable";

const DefaultCalculator = () => {
    const gameMode = useSelector(selectGameMode);
    const isCraftTableShown = useSelector(selectCraftTableVisibility);
    const isInfoTableShown = useSelector(selectInfoTableVisibility);

    const defineStyles = () => {
        let defaultCalculatorStyles = styles.defaultCalculatorWrapper;
        let craftTableStyles = styles.craftTableStyles;

        if (gameMode){
            defaultCalculatorStyles = `${styles.defaultCalculatorWrapper} ${styles.defaultCalculatorWrapperHidden}`;
        }

        if (isCraftTableShown){
            craftTableStyles = `${styles.craftTableStyles} ${styles.craftTableOpenedStyles}`;
            defaultCalculatorStyles = `${styles.defaultCalculatorWrapper} ${styles.defaultCalculatorWrapperOpened}`;
        }

        return {defaultCalculatorStyles, craftTableStyles};
    }

    const {defaultCalculatorStyles, craftTableStyles} = defineStyles();

    return <div className={styles.wrapper}>
        {isInfoTableShown && <InfoTable />}

        <div className={defaultCalculatorStyles}>
            <CalculatorForm />

            <div className={craftTableStyles}>
                <CraftTable />
            </div>
        </div>
    </div>
}

export default DefaultCalculator;