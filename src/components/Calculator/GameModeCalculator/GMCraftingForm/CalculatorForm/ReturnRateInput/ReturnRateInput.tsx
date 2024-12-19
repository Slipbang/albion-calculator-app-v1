import {useSelector} from "react-redux";
import {selectGuide, selectReturnPercentCF} from "../../../../../../store/interface/interface-selector";
import {useAppDispatch} from "../../../../../../store";
import {interfaceSliceActions} from "../../../../../../store/interface/interface-slice";
import styles from './ReturnRateInput.module.scss';
import {selectLanguage} from "../../../../../../store/language/language-selector";
import {useEffect, useRef} from "react";

const ReturnRateInput = () => {
    const dispatchAction = useAppDispatch();

    const returnPercentInputRef = useRef<HTMLInputElement>(null)

    const returnPercent = useSelector(selectReturnPercentCF);
    const {language} = useSelector(selectLanguage);
    const {GMCraftingFormStrings} = language;
    const {script} = useSelector(selectGuide);

    const setReturnPercentHandler = (value: number) => {
        dispatchAction(interfaceSliceActions.setReturnPercentCF(value));
    }

    const isInputValid = (value: number) => {
        return value >= 15.2 && value <= 70;
    }

    useEffect(() => {
        if (script === 16) {
            setReturnPercentHandler(47.9);
            returnPercentInputRef.current?.focus();
        }
    }, [script])

    return (
        <div className={styles.returnRateInput} data-isinputvalid={isInputValid(returnPercent) ? 'valid' : 'nonValid'}>
            <div className={styles.resourceLabel}>
                <p>{GMCraftingFormStrings.resourceLabel}</p>
            </div>

            <p>{GMCraftingFormStrings.returnRateLabel}</p>
            <input
                id='CFReturnRateInput'
                type="number"
                style={{width: '30px', height: '12px'}}
                step={0.1}
                min={15.2}
                max={70.0}
                ref={returnPercentInputRef}
                value={returnPercent.toFixed(1)}
                onChange={(event) => setReturnPercentHandler(+event.target.value)}
                onFocus={() => returnPercentInputRef.current?.select()}
                draggable={true}
                onDragStart={event => event.preventDefault()}
                onDragOver={event => event.preventDefault()}
                onDrag={event => event.preventDefault()}
                onDragEnter={event => event.preventDefault()}
            />
            <p className={styles.notification}>%</p>
        </div>
    )
}

export default ReturnRateInput;