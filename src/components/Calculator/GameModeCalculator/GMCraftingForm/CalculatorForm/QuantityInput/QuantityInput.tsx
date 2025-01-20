import StyledRangeButtonMinus from "../../../../StyledComponentsCommon/StyledRangeButtonMinus";
import StyledInputRange from "../../../../StyledComponentsCommon/StyledInputRange";
import {craftInputRange} from "../../../../CommonImgReexports/CommonImgReexports";
import StyledRangeButtonPlus from "../../../../StyledComponentsCommon/StyledRangeButtonPlus";

import {useSelector} from "react-redux";
import {useAppDispatch} from "../../../../../../store";
import {interfaceSliceActions} from "../../../../../../store/interface/interface-slice";
import {useEffect, useRef} from "react";
import {useMaterialsCalculation} from "../../Hooks/useMaterialsCalculation";
import styles from './QuantityInput.module.scss';
import {selectLanguage} from "../../../../../../store/language/language-selector";
import {selectBackpackItems, selectWorkBenchItem} from "../../../../../../store/GMProfit/gm-profit-selectors";
import {
    selectEnchantmentNumCF, selectItemsQuantityCF,
    selectMaterialEnchantmentCF
} from "../../../../../../store/interface/interface-selector";

const QuantityInput = () => {

    const dispatchAction = useAppDispatch();

    const {language} = useSelector(selectLanguage);
    const {GMCraftingFormStrings} = language;

    const inputAmountRef = useRef<HTMLInputElement | null>(null)

    const backpackItems = useSelector(selectBackpackItems);
    const enchantmentNum = useSelector(selectEnchantmentNumCF);
    const itemsQuantity = useSelector(selectItemsQuantityCF);
    const materialEnchantment = useSelector(selectMaterialEnchantmentCF);
    const selectedWorkBenchItem = useSelector(selectWorkBenchItem);
    const {itemId} = selectedWorkBenchItem;

    const {maxQuantity} = useMaterialsCalculation({itemsQuantity, enchantmentNum, selectedWorkBenchItem, materialEnchantment, backpackItems});

    const calculateInputNumberLeft = () => {
        return itemsQuantity > 1 ? `${(((itemsQuantity - 1) * 100) / (maxQuantity - 1))}` : 0;
    }

    const setItemsQuantityHandler = (value: number) => {
        if (value > 0 && value <= maxQuantity) {
            dispatchAction(interfaceSliceActions.setItemsQuantityCF(value));
        }
    }

    useEffect(() => {
        dispatchAction(interfaceSliceActions.setItemsQuantityCF(maxQuantity));
    }, [maxQuantity])

    return (
        <>
            {!!maxQuantity && <div
                className={styles.inputRange}
                draggable={true}
                onDragStart={event => event.preventDefault()}
                onDragOver={event => event.preventDefault()}
                onDrag={event => event.preventDefault()}
                onDragEnter={event => event.preventDefault()}
            >
                <div className={styles.inputQuantityBox}>
                    <input
                        id='selectedItemQuantityInput'
                        type="number"
                        min={1}
                        max={maxQuantity}
                        ref={inputAmountRef}
                        style={{left: `${calculateInputNumberLeft()}%`}}
                        value={itemsQuantity * (itemId!.includes('STONEBLOCK') && +enchantmentNum > 0 ? Math.pow(2, +enchantmentNum) : 1)}
                        step={1}
                        onChange={(event) => setItemsQuantityHandler(+event.target.value)}
                        onFocus={() => inputAmountRef.current?.select()}
                    />
                </div>
                <div className={styles.quantityLabel}>
                    <p>{GMCraftingFormStrings.quantity}</p>
                </div>
                <StyledRangeButtonMinus
                    $isButtonActive={itemsQuantity > 1}
                    onClick={() => setItemsQuantityHandler(itemsQuantity - 1)}
                    onMouseDown={(event) => event.preventDefault()}
                    onMouseUp={(event) => event.preventDefault()}
                    disabled={itemsQuantity === 1}
                />
                <StyledInputRange
                    $height={18}
                    $width={212}
                    $inputImage={craftInputRange}
                    min={1}
                    max={maxQuantity}
                    step={1}
                    value={itemsQuantity}
                    onChange={(event) => {
                        setItemsQuantityHandler(+event.target.value);
                    }}
                />
                <StyledRangeButtonPlus
                    $isButtonActive={itemsQuantity < maxQuantity}
                    onClick={() => setItemsQuantityHandler(itemsQuantity + 1)}
                    disabled={itemsQuantity === maxQuantity}
                />
            </div>}
        </>
    )
}

export default QuantityInput;