import StyledEnchantmentButton from "../../GMCraftingFormSC/StyledEnchantmentButton";
import {TCalcProps} from "../../../../../../types/calculatorPropsType";
import {useAppDispatch} from "../../../../../../store";
import {interfaceSliceActions} from "../../../../../../store/interface/interface-slice";
import {useSelector} from "react-redux";
import {selectWorkBenchItem} from "../../../../../../store/GMProfit/gm-profit-selectors";
import styles from './EnchantmentButtons.module.scss';
import {selectLanguage} from "../../../../../../store/language/language-selector";
import {selectEnchantmentButtons} from "../../../../../../store/interface/interface-selector";
import {
    IEnchantmentButton
} from "../../../../../../store/interface/DummyEnchantmentButtons/DummyEnchantmentButtons";

interface IEnchantmentButtonsProps {
    calculatorType: TCalcProps;
}

const EnchantmentButtons = ({calculatorType}: IEnchantmentButtonsProps) => {

    const selectedWorkBenchItem = useSelector(selectWorkBenchItem);
    const enchantmentButtons = useSelector(selectEnchantmentButtons);
    const {itemId} = selectedWorkBenchItem;
    const {language} = useSelector(selectLanguage);
    const {GMCraftingFormStrings} = language;

    const dispatchAction = useAppDispatch();

    const activateButtonHandler = (index: number) => {
        const reservedButtons = JSON.parse(JSON.stringify(enchantmentButtons)) as IEnchantmentButton[];
        reservedButtons.forEach(resElem => {
            if (resElem.index !== index) {
                resElem.active = false;
            }
        });

        reservedButtons[index].active = !reservedButtons[index].active;

        let materialEnchantment = '';
        let itemEnchantment = '';
        let enchantmentNum: string = '';

        reservedButtons.forEach(button => {
            if (button.active) {
                const level = button.index + 1;
                materialEnchantment = `_LEVEL${level}@${level}`;
                if (calculatorType === 'ITEMS') {
                    itemEnchantment = `@${level}`;
                } else {
                    itemEnchantment = '';
                }
                enchantmentNum = level.toString();
            }
        });

        dispatchAction(interfaceSliceActions.setEnchantmentButtons(reservedButtons));
        dispatchAction(interfaceSliceActions.setMaterialEnchantmentCF(materialEnchantment));
        dispatchAction(interfaceSliceActions.setItemEnchantmentCF(itemEnchantment));
        dispatchAction(interfaceSliceActions.setEnchantmentNumCF(enchantmentNum));
    }

    return (
        <>
            {(calculatorType === 'ITEMS' || calculatorType === 'RESOURCES' && itemId!.includes('STONEBLOCK')) &&
                <div className={styles.enchantmentButtons}
                     draggable={true}
                     onDragStart={event => event.preventDefault()}
                     onDragOver={event => event.preventDefault()}
                     onDrag={event => event.preventDefault()}
                     onDragEnter={event => event.preventDefault()}
                >
                    <div className={styles.enchantmentLabel}>
                        <p>{GMCraftingFormStrings.enchantment}</p>
                    </div>
                    {enchantmentButtons.filter(item => {
                        if (itemId!.includes('STONEBLOCK')) {
                            return item.index < 3;
                        } else {
                            return true;
                        }
                    }).map(({index, active, activeButton, hoveredActiveButton, button, hoveredButton}) => {

                        return (
                            <StyledEnchantmentButton
                                key={index}
                                $isSelected={active}
                                $enchantmentButton={button}
                                $hoveredEnchantmentButton={hoveredButton}
                                $selectedEnchantmentButton={activeButton}
                                $hoveredActiveEnchantmentButton={hoveredActiveButton}
                                onClick={() => activateButtonHandler(index)}
                                onMouseDown={(event) => event.preventDefault()}
                            />
                        )
                    })}
                </div>}
        </>
    )
}

export default EnchantmentButtons;