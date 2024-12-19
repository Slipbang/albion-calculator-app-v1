import {GMItemSelector} from "./GMItemSelector/GMItemSelector";
import Backpack from "./Backpack/Backpack";
import GMCraftingForm from "./GMCraftingForm/GMCraftingForm";
import {useSelector} from "react-redux";
import {
    selectCraftingFormVisibility,
    selectDemoMode,
    selectGameMode,
    selectGuide,
    selectMarketItemVisibility,
    selectMarketMenuShown
} from "../../../store/interface/interface-selector";
import MarketItem from "./MarketItem/MarketItem";
import MarketMenu from "./MarketMenu/MarketMenu";
import styles from './GameModeCalculator.module.scss'
import CalculatorTypeButtons from "../CalculatorTypeButtons/CalculatorTypeButtons";
import classNames from 'classnames/bind';
import GuideButton from "./GuideButton/GuideButton";
import GameModeGuide from "./GameModeGuide/GameModeGuide";

const GameModeCalculator = () => {
    const isCraftingFormVisible = useSelector(selectCraftingFormVisibility);
    const isMarketItemVisible = useSelector(selectMarketItemVisibility);
    const isMarketMenuShown = useSelector(selectMarketMenuShown);
    const isDemo = useSelector(selectDemoMode);
    const {script, position} = useSelector(selectGuide);
    const gameMode = useSelector(selectGameMode);

    const extendedClassNames = classNames.bind(styles);

    const GMItemSelectorWrapper = extendedClassNames(styles.GMItemSelectorWrapper, {
        [styles.GMItemSelectorWrapperHidden]: !gameMode,
        [styles.GMItemSelectorDemo]: [7, 8, 9, 10, 11,].includes(script),
    })

    const backpackWrapper = extendedClassNames(styles.backpackWrapper, {
        [styles.backpackWrapperHidden]: !gameMode,
        [styles.backpackDemo]: [1, 2, 3, 19, 21, 23, 24].includes(script),
    })

    const marketMenuWrapper = extendedClassNames(styles.marketMenuWrapper, {
        [styles.marketMenuShown]: !!isMarketMenuShown,
    })

    const demoButtonWrapper = extendedClassNames(styles.demoButtonWrapper, {
        [styles.demoButtonHidden]: !gameMode,
    })

    const guideWrapper = extendedClassNames(styles.guideWrapper, {
        [styles.guideHidden]: (!gameMode || !isDemo),
    })

    return (
        <div className={styles.wrapper}>
            <CalculatorTypeButtons/>

            {!!isMarketItemVisible && <MarketItem script={script}/>}

            {!!isCraftingFormVisible && <GMCraftingForm script={script}/>}

            <div className={GMItemSelectorWrapper}>
                <GMItemSelector/>
            </div>

            <div className={demoButtonWrapper}>
                <GuideButton/>
            </div>

            <div className={guideWrapper} data-guide={position}>
                <GameModeGuide/>
            </div>

            <div className={backpackWrapper}>
                <Backpack/>

                <div className={marketMenuWrapper}>
                    <MarketMenu/>
                </div>
            </div>
        </div>
    )
}

export default GameModeCalculator;
