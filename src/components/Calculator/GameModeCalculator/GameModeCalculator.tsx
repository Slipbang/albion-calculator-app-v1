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

const GameModeCalculator = () => {
    const isCraftingFormVisible = useSelector(selectCraftingFormVisibility);
    const isMarketItemVisible = useSelector(selectMarketItemVisibility);
    const isMarketMenuShown = useSelector(selectMarketMenuShown);
    const gameMode = useSelector(selectGameMode);

    return (
        <div className={styles.wrapper}>
            <CalculatorTypeButtons />

            {!!isMarketItemVisible && <MarketItem/>}

            {!!isCraftingFormVisible && <GMCraftingForm />}

            <div className={`${styles.GMItemSelectorWrapper} ${!gameMode ? styles.GMItemSelectorWrapperHidden : ''}`}>
                <GMItemSelector />
            </div>

            <div className={`${styles.backpackWrapper} ${!gameMode ? styles.backpackWrapperHidden : ''}`}>
                <Backpack />

                <div className={`${styles.marketMenuWrapper} ${!!isMarketMenuShown ? styles.marketMenuShown : ''}`}>
                    <MarketMenu/>
                </div>
            </div>
        </div>
    )
}

export default GameModeCalculator;
