import {useSelector} from "react-redux";
import {selectFoodTax} from "../../../../../../../store/GMProfit/gm-profit-selectors";
import {TCalcProps} from "../../../../../../../types/calculatorPropsType";

interface ITotalFoodTaxProps {
    calculatorType: TCalcProps;
    foodConsumption: number;
    itemTier: number;
}

const TotalFoodTax = (props: ITotalFoodTaxProps) => {
    const {foodConsumption, itemTier, calculatorType} = props;

    const foodTax = useSelector(selectFoodTax);

    const calculateFoodTax = (foodConsumption: number, itemTier: number): number => {

        if (calculatorType === 'resource') {
            return Math.ceil(foodConsumption * (foodTax / 100));
        } else {
            return Math.ceil(foodConsumption! * Math.pow(2, itemTier - 4) * (foodTax / 100));
        }
    }

    const totalFoodTax = calculateFoodTax(foodConsumption!, itemTier);

    return <p>{totalFoodTax?.toLocaleString('en')}</p>
}

export default TotalFoodTax;