import {interfaceSliceActions} from "../../../store/interface/interface-slice";
import {useSelector} from "react-redux";
import {
    selectCalculatorType, selectDemoMode,
    selectGameMode,
    selectInterfaceConsumablesSelectorItems,
    selectTheme
} from "../../../store/interface/interface-selector";
import {useAppDispatch} from "../../../store";
import {TCalcProps} from "../../../types/calculatorPropsType";
import styles from './CalculatorTypeButtons.module.scss';
import {memo, useEffect} from "react";
import {profitSliceActions} from "../../../store/profit/profit-slice";

interface ISelector {
    src: string;
    type: TCalcProps;
}

const selectors: ISelector[] = [
    {
        src: 'https://render.albiononline.com/v1/item/T8_POTION_COOLDOWN',
        type: 'POTIONS',
    },
    {
        src: 'https://render.albiononline.com/v1/item/T8_MEAL_STEW_AVALON',
        type: 'FOOD',
    },
    {
        src: 'https://render.albiononline.com/v1/item/T8_METALBAR',
        type: 'RESOURCES',
    },
    {
        src: 'https://render.albiononline.com/v1/item/T8_MAIN_SWORD',
        type: 'ITEMS',
    },
]

const CalculatorTypeButtons = () => {
    const dispatchAction = useAppDispatch();

    const theme = useSelector(selectTheme);
    const calculatorType = useSelector(selectCalculatorType);
    const gameMode = useSelector(selectGameMode);
    const consumablesSelectorItems = useSelector(selectInterfaceConsumablesSelectorItems);
    const isDemo = useSelector(selectDemoMode);

    const selectCalculatorTypeHandler = (calculatorType: TCalcProps) => {
        dispatchAction(interfaceSliceActions.setCalculatorType(calculatorType as TCalcProps));
        dispatchAction(interfaceSliceActions.setIsCraftingFormVisible(false));

        dispatchAction(profitSliceActions.setSelected({
            type: calculatorType,
            selectedConsumable: consumablesSelectorItems[calculatorType]['T4'][0]
        }))
    }

    const toggleGameMode = () => {
        if (calculatorType === 'ITEMS' || calculatorType === 'RESOURCES') {
            dispatchAction(interfaceSliceActions.toggleGameMode());
        }
    }

    useEffect(() => {
        if (isDemo && gameMode) selectCalculatorTypeHandler('ITEMS');
    }, [isDemo, gameMode])

    return (
        <div className={styles.wrapper} data-theme={theme}>

            <div className={styles.calculatorTypeButtons}>
                {selectors.map(({type, src}) => {
                    if (!!gameMode && (type === 'FOOD' || type === 'POTIONS')) return;

                    return (
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
                    )
                })}

                <div
                    data-mode={gameMode ? 'game' : 'default'}
                    data-calculatortype-allowed={(calculatorType === 'POTIONS' || calculatorType === 'FOOD') ? 'simplified-only' : 'all-modes'}
                    className={styles.GMToggleButton}
                    onClick={() => toggleGameMode()}
                >

                    <div className={`${styles.sword} ${gameMode ? styles.applySword : styles.removeSword}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="233px" height="72px" style={{shapeRendering: "geometricPrecision", textRendering: "geometricPrecision", fillRule: "evenodd", clipRule: "evenodd"}} >
                            <g><path style={{opacity: 1}} fill="#cf2c27" d="M 232.5,33.5 C 232.5,34.5 232.5,35.5 232.5,36.5C 226.597,43.2172 219.264,47.7172 210.5,50C 163.507,51.1047 116.507,51.7714 69.5,52C 68.6667,52.8333 67.8333,53.6667 67,54.5C 66.6667,59.5 66.3333,64.5 66,69.5C 63,70.8333 60,70.8333 57,69.5C 56.5002,60.8397 56.3336,52.1731 56.5,43.5C 43.4957,43.3334 30.4957,43.5001 17.5,44C 13.0923,46.5545 8.42566,47.8879 3.5,48C 1.92975,46.6032 0.596413,45.1032 -0.5,43.5C -0.5,38.1667 -0.5,32.8333 -0.5,27.5C 1.11825,25.215 3.11825,23.215 5.5,21.5C 9.38059,23.6072 13.3806,25.4405 17.5,27C 30.4957,27.4999 43.4957,27.6666 56.5,27.5C 56.3336,18.8269 56.5002,10.1603 57,1.5C 60,0.166667 63,0.166667 66,1.5C 66.3333,6.5 66.6667,11.5 67,16.5C 67.8333,17.3333 68.6667,18.1667 69.5,19C 116.507,19.2286 163.507,19.8953 210.5,21C 218.935,23.3798 226.268,27.5464 232.5,33.5 Z"/></g>
                        </svg>
                    </div>
                    <div className={styles.gmText}>
                        <p className={styles.scaleP}>Game Mode:</p>
                        <p className={styles.gameModeOff}>{gameMode ? 'ON' : 'OFF'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(CalculatorTypeButtons);
