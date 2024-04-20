import {GMItemSelector} from "./GMItemSelector/GMItemSelector";
import Backpack from "./Backpack/Backpack";
import GMCraftingForm from "./GMCraftingForm/GMCraftingForm";
import {useSelector} from "react-redux";
import {
    selectCraftingFormVisibility,
    selectGameMode,
    selectMarketItemVisibility,
    selectMarketMenuShown
} from "../../../store/interface/interface-selector";
import MarketItem from "./MarketItem/MarketItem";
import MarketMenu from "./MarketMenu/MarketMenu";
import styles from './GameModeCalculator.module.scss'
import CalculatorTypeButtons from "../CalculatorTypeButtons/CalculatorTypeButtons";
import classNames from 'classnames/bind';

const GameModeCalculator = () => {
    const isCraftingFormVisible = useSelector(selectCraftingFormVisibility);
    const isMarketItemVisible = useSelector(selectMarketItemVisibility);
    const isMarketMenuShown = useSelector(selectMarketMenuShown);
    const gameMode = useSelector(selectGameMode);

    const extendedClassNames = classNames.bind(styles);

    const GMItemSelectorWrapper = extendedClassNames(styles.GMItemSelectorWrapper, {
        [styles.GMItemSelectorWrapperHidden]: !gameMode,
    })

    const backpackWrapper = extendedClassNames(styles.backpackWrapper, {
        [styles.backpackWrapperHidden]: !gameMode,
    })

    const marketMenuWrapper = extendedClassNames(styles.marketMenuWrapper, {
        [styles.marketMenuShown]: !!isMarketMenuShown,
    })

    return (
        <div className={styles.wrapper}>
            <CalculatorTypeButtons />

            {!!isMarketItemVisible && <MarketItem />}

            {!!isCraftingFormVisible && <GMCraftingForm />}

            <div className={GMItemSelectorWrapper}>
                <GMItemSelector />
            </div>

            <div className={backpackWrapper}>
                <Backpack />

                <div className={marketMenuWrapper}>
                    <MarketMenu/>
                </div>
            </div>
        </div>
    )
}

export default GameModeCalculator;
