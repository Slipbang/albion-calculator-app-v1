import BackpackResetButton from "./Buttons/BackpackResetButton";
import BackpackGatherButton from "./Buttons/BackpackGatherButton";
import BackpackSortButton from "./Buttons/BackpackSortButton";
import React from "react";
import styles from './BackpackButtonsBox.module.scss';

const BackpackButtonsBox = () => {

    return (
        <div className={styles.buttonsWrapper}>
            <BackpackResetButton />

            <BackpackGatherButton />

            <BackpackSortButton />
        </div>
    )
}

export default BackpackButtonsBox;