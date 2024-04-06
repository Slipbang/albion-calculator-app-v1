import {interfaceSliceActions} from "../../../store/interface/interface-slice";
import {gameModeOff_L, gameModeOff_D, gameModeOn} from "../CommonImgReexports/CommonImgReexports";
import {useSelector} from "react-redux";
import {selectCalculatorType, selectGameMode, selectTheme} from "../../../store/interface/interface-selector";
import {useAppDispatch} from "../../../store";
import {TCalcProps} from "../../../types/calculatorPropsType";
import styles from './CalculatorTypeButtons.module.scss';
import React from "react";

interface ISelector {
    src: string;
    type: TCalcProps;
}

const selectors: ISelector[] = [
    {
        src: 'https://render.albiononline.com/v1/item/T8_METALBAR',
        type: 'resource',
    },
    {
        src: 'https://render.albiononline.com/v1/item/T8_MAIN_SWORD',
        type: 'items',
    },
    // {
    //     src: 'https://render.albiononline.com/v1/item/T8_POTION_COOLDOWN',
    //     type: 'potions',
    // },
    // {
    //     src: 'https://render.albiononline.com/v1/item/T8_MEAL_STEW_AVALON',
    //     type: 'food',
    // },
]

const CalculatorTypeButtons = React.memo(() => {
    const dispatchAction = useAppDispatch();

    const theme = useSelector(selectTheme);
    const isDark = theme === 'dark';
    const calculatorType = useSelector(selectCalculatorType);
    const gameMode = useSelector(selectGameMode);

    const selectCalculatorTypeHandler = (calculatorType: TCalcProps) => {
        dispatchAction(interfaceSliceActions.setCalculatorType(calculatorType));
        dispatchAction(interfaceSliceActions.setIsCraftingFormVisible(false));
    }

    const toggleStyles = () => {
        dispatchAction(interfaceSliceActions.toggleGameMode())
    }

    const defineColor = () => {
        if (!!gameMode || !!isDark) {
            return 'white'
        }
        if (!gameMode && !isDark) {
            return 'black'
        }

        return 'black'
    }

    return (
        <div className={styles.wrapper}>

            <div className={styles.calculatorTypeButtons}>
                {selectors.map(({type, src}) => (
                    <div key={type}>
                        <img
                            alt=''
                            draggable={false}
                            src={src}
                            title={type}
                            className={`${styles.backgroundSkeleton} ${calculatorType === type ? styles.isSelected : styles.isNotSelected}`}
                            onClick={() => {
                                selectCalculatorTypeHandler(type);
                            }}
                        />
                        {calculatorType === type && <p className={styles.checkMark}>✓</p>}
                    </div>
                ))}

                <div
                    className={styles.GMToggleButton}
                    onClick={() => toggleStyles()}
                >
                    <img
                        draggable={false}
                        src={gameModeOn}
                        alt="gmButton"
                        className={gameMode ? styles.applySword : styles.removeSword}
                    />
                    <p
                        className={!gameMode ? styles.scaleP : ''}
                        style={{color: defineColor()}}>Game Mode:</p>
                    <img
                        draggable={false}
                        src={isDark ? gameModeOff_D : gameModeOff_L}
                        alt='off'
                        className={styles.gameModeOffImg}
                    />
                </div>
            </div>
        </div>
    )
})

export default CalculatorTypeButtons;