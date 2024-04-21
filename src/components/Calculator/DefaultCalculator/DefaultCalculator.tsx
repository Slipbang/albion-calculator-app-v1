import styles from './DefaultCalculator.module.scss'
import CalculatorForm from "./CalculatorForm/CalculatorForm";
import CraftTable from "./CraftTable/CraftTable";
import {useSelector} from "react-redux";
import {
    selectCalculatorType,
    selectCraftTableVisibility,
    selectGameMode,
    selectInfoTableVisibility
} from "../../../store/interface/interface-selector";
import InfoTable from "./InfoTable/InfoTable";
import classNames from 'classnames/bind';

const DefaultCalculator = () => {
    const gameMode = useSelector(selectGameMode);
    const isCraftTableShown = useSelector(selectCraftTableVisibility);
    const isInfoTableShown = useSelector(selectInfoTableVisibility);
    const calculatorType = useSelector(selectCalculatorType);

    const extendedClassNames = classNames.bind(styles);

    const defaultCalculatorStyles = extendedClassNames(styles.defaultCalculatorWrapper, {
        [styles.defaultCalculatorWrapperHidden]: !!gameMode,
        [styles.defaultCalculatorWrapperOpened]: !!isCraftTableShown,
    })

    const craftTableStyles = extendedClassNames(styles.craftTableStyles, {
        [styles.craftTableOpenedStyles]: !!isCraftTableShown,
    })

    return <div className={styles.wrapper}>
        {!!isInfoTableShown && <InfoTable calculatorType={calculatorType} />}

        <div className={defaultCalculatorStyles}>
            <CalculatorForm calculatorType={calculatorType} />

            <div className={craftTableStyles}>
                <CraftTable calculatorType={calculatorType} />
            </div>
        </div>
    </div>
}

export default DefaultCalculator;