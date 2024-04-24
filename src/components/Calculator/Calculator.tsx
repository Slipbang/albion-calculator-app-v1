import styles from './Calculator.module.scss';

import DefaultCalculator from "./DefaultCalculator/DefaultCalculator";
import GameModeCalculator from "./GameModeCalculator/GameModeCalculator";
import ModalWindow from "./ModalWindow/ModalWindow";

const Calculator = () => {

    return (
        <>
            <ModalWindow />

            <div className={styles.wrapper}>
                <GameModeCalculator />

                <DefaultCalculator />
            </div>
        </>
    )
}

export default Calculator;