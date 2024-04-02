import {interfaceSliceActions} from "../../../store/interface/interface-slice";
import {gameModeOff, gameModeOn} from "../CommonImgReexports/CommonImgReexports";
import {useSelector} from "react-redux";
import {selectCalculatorType, selectGameMode} from "../../../store/interface/interface-selector";
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

    const calculatorType = useSelector(selectCalculatorType);
    const gameMode = useSelector(selectGameMode);

    const selectCalculatorTypeHandler = (calculatorType: TCalcProps) => {
        dispatchAction(interfaceSliceActions.setCalculatorType(calculatorType));
        dispatchAction(interfaceSliceActions.setIsCraftingFormVisible(false));
    }

    const toggleStyles = () => {
        dispatchAction(interfaceSliceActions.toggleGameMode())
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
                            className={calculatorType === type ? `${styles.isSelected} ${styles.backgroundSkeleton}` : `${styles.isNotSelected} ${styles.backgroundSkeleton}`}
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
                        style={{color: `${!!gameMode ? 'white' : 'black'}`}}>Game Mode:</p>
                    <img
                        draggable={false}
                        src={gameModeOff}
                        alt='off'
                        style={{width: '48px', height: '26px', position: "absolute", top: '74px', left: '92px', zIndex: 1}}
                    />
                </div>
            </div>
        </div>
    )
})

export default CalculatorTypeButtons;