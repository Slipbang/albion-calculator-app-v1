import StyledThumb from "../../../StyledComponentsCommon/StyledThumb";
import {useSelector} from "react-redux";
import styles from './WorkBenchItemSelector.module.scss'
import {memo, useDeferredValue} from "react";
import WorkBenchItemsLoader from "../ItemsLoaders/WorkBenchItemsLoader";
import WorkBenchItem from "./WorkBenchItem/WorkBenchItem";
import {selectItemType, selectWorkBenchType} from "../../../../../store/GMProfit/gm-profit-selectors";
import {selectInterfaceWorkBenchSelectorItems} from "../../../../../store/interface/interface-selector";

const WorkBenchItemSelector = () => {

    const selectedWorkBenchType = useSelector(selectWorkBenchType);
    const selectedItemType = useSelector(selectItemType);
    const workBenchSelectorItems = useSelector(selectInterfaceWorkBenchSelectorItems);
    const items = workBenchSelectorItems[selectedWorkBenchType][selectedItemType];
    const deferredCraftingItems = useDeferredValue(items);

    return (
        <StyledThumb>
            <div className={styles.wrapper}>
                {items === deferredCraftingItems && deferredCraftingItems?.map(item => <WorkBenchItem key={item.itemId} item={{...item}}/>)}

                {items !== deferredCraftingItems && Array.from({length: 10}).map((_, index) =>
                    <div key={index} style={{margin: '10px 0 10px 0',}}>
                        <WorkBenchItemsLoader/>
                    </div>
                )}
            </div>
        </StyledThumb>
    )
}

export default memo(WorkBenchItemSelector);