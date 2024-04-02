import StyledThumb from "../../../StyledComponentsCommon/StyledThumb";
import {useSelector} from "react-redux";
import {selectCraftingItems} from "../../../../../store/GMProfit/gm-profit-selectors";
import styles from './WorkBenchItemSelector.module.scss'
import {useDeferredValue} from "react";
import WorkBenchItemsLoader from "../ItemsLoaders/WorkBenchItemsLoader";
import WorkBenchItem from "./WorkBenchItem/WorkBenchItem";


const WorkBenchItemSelector = () => {
    const craftingItems = useSelector(selectCraftingItems);
    const deferredCraftingItems = useDeferredValue(craftingItems);


    return <StyledThumb>
        <div className={styles.wrapper}>
            {craftingItems === deferredCraftingItems && deferredCraftingItems.map(item => <WorkBenchItem key={item.itemId} item={{...item}} />)}

            {craftingItems !== deferredCraftingItems && Array.from({length: 10}).map((_, index) => (
                <div key={index} style={{margin: '10px 0 10px 0',}}>
                    <WorkBenchItemsLoader/>
                </div>
            ))}
        </div>
    </StyledThumb>
}

export default WorkBenchItemSelector;