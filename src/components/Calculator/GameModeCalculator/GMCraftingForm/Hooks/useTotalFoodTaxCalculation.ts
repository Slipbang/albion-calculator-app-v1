import {TCalcProps} from "../../../../../types/calculatorPropsType";
import {ISelectedWorkBenchItem} from "../../../../../store/GMProfit/gm-profit-slice";

interface IUseTotalFoodTaxCalculationProps {
    calculatorType: TCalcProps;
    itemsQuantity: number;
    selectedWorkBenchItem:  ISelectedWorkBenchItem;
    foodTax: number;
    enchantmentNum: string;
}

const useTotalFoodTaxCalculation = (props: IUseTotalFoodTaxCalculationProps) => {
    const {
        itemsQuantity,
        selectedWorkBenchItem,
        calculatorType,
        foodTax,
        enchantmentNum
    } = props;

    const {
        itemId,
        foodConsumption,
        itemTier,
        defaultFoodConsumption,
    } = selectedWorkBenchItem;

    const totalFoodTax = Math.round(itemsQuantity * (itemId!.includes('STONEBLOCK') && +enchantmentNum > 0 ? Math.pow(2, +enchantmentNum) : 1) * (foodTax / 100) * (calculatorType === 'RESOURCES' ? foodConsumption! : (foodConsumption! * (Math.pow(2, itemTier - 4)) + (defaultFoodConsumption! * Math.pow(2, itemTier - 4) * (Math.pow(2, +enchantmentNum) - 1)))));

    return {totalFoodTax}
}

export {useTotalFoodTaxCalculation};