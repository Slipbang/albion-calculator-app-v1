import StyledRangeButtonMinus from "../../../../StyledComponentsCommon/StyledRangeButtonMinus";
import {interfaceSliceActions} from "../../../../../../store/interface/interface-slice";
import StyledInputRange from "../../../../StyledComponentsCommon/StyledInputRange";
import {marketInputRange} from "../../../../CommonImgReexports/CommonImgReexports";
import StyledRangeButtonPlus from "../../../../StyledComponentsCommon/StyledRangeButtonPlus";
import {useAppDispatch} from "../../../../../../store";
import {useSelector} from "react-redux";
import {selectItemQuantityMI} from "../../../../../../store/interface/interface-selector";
import {ChangeEvent, useEffect, useRef} from "react";
import {useMaxQuantityCalculation} from "../../Hooks/useMaxQuantityCalculation";
import styles from './QuantityInput.module.scss';
import {selectLanguage} from "../../../../../../store/language/language-selector";

const QuantityInput = () => {
    const dispatchAction = useAppDispatch();

    const itemInputQuantity = useSelector(selectItemQuantityMI);
    const {language} = useSelector(selectLanguage);
    const {marketItemStings} = language;

    const quantityInputRef = useRef<HTMLInputElement>(null);

    const {maxQuantity} = useMaxQuantityCalculation();

    const calculateNewLeft = () => {
        return itemInputQuantity > 1 ? `${((itemInputQuantity - 1) * 100) / ((maxQuantity! - 1))}` : 0;
    }

    const changeItemQuantityHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (+event.target.value < 1) return
        dispatchAction(interfaceSliceActions.setItemQuantityMI(+event.target.value));
    }

    useEffect(() => {
        dispatchAction(interfaceSliceActions.setItemQuantityMI(maxQuantity!));
    }, [maxQuantity])

    return (
        <div className={styles.inputRangeWrapper}>
            <span className={styles.amountLabel}>
                <p>{marketItemStings.amountLabel}</p>
            </span>
            <div>
                <input
                    id='MIItemQuantityInput'
                    min={1}
                    type="number"
                    ref={quantityInputRef}
                    style={{left: `${calculateNewLeft()}%`}}
                    value={itemInputQuantity}
                    onChange={(event) => {
                        if (+event.target.value >= 1 && +event.target.value <= maxQuantity!) {
                            changeItemQuantityHandler(event)
                        }
                    }}
                    onFocus={() => quantityInputRef.current?.select()}
                />
            </div>
            <StyledRangeButtonMinus
                disabled={itemInputQuantity === 1}
                $isButtonActive={itemInputQuantity > 1}
                onClick={() => {
                    if (itemInputQuantity > 1) {
                        dispatchAction(interfaceSliceActions.setItemQuantityMI(itemInputQuantity - 1))
                    }
                }}
            />
            <StyledInputRange
                $height={18}
                $width={280}
                $inputImage={marketInputRange}
                min={1}
                max={maxQuantity!}
                step={1}
                value={itemInputQuantity}
                onChange={(event) => changeItemQuantityHandler(event)}
            />
            <StyledRangeButtonPlus
                disabled={itemInputQuantity === maxQuantity}
                $isButtonActive={itemInputQuantity < maxQuantity!}
                onClick={() => {
                    if (itemInputQuantity < maxQuantity!) {
                        dispatchAction(interfaceSliceActions.setItemQuantityMI(itemInputQuantity + 1))
                    }
                }}
            />
        </div>
    )
}

export default QuantityInput;