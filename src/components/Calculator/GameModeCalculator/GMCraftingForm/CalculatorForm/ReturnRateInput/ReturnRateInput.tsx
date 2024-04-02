import {useSelector} from "react-redux";
import {selectReturnPercentCF} from "../../../../../../store/interface/interface-selector";
import {useAppDispatch} from "../../../../../../store";
import {interfaceSliceActions} from "../../../../../../store/interface/interface-slice";
import styles from './ReturnRateInput.module.scss';
import {selectLanguage} from "../../../../../../store/language/language-selector";

const ReturnRateInput = () => {
    const dispatchAction = useAppDispatch();

    const returnPercent = useSelector(selectReturnPercentCF);
    const {language} = useSelector(selectLanguage);
    const {GMCraftingFormStrings} = language;

    const setReturnPercentHandler = (value: number) => {
        if (value >= 15.2 && value < 70) {
            dispatchAction(interfaceSliceActions.setReturnPercentCF(value));
        }
    }

    return (
        <div className={styles.returnRateInput}>
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
                value={returnPercent.toFixed(1)}
                onChange={(event) => setReturnPercentHandler(+event.target.value)}
                draggable={true}
                onDragStart={event => event.preventDefault()}
                onDragOver={event => event.preventDefault()}
                onDrag={event => event.preventDefault()}
                onDragEnter={event => event.preventDefault()}
            />
            <p>%</p>
        </div>
    )
}

export default ReturnRateInput;