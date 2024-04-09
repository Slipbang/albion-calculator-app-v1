import CustomItemSelector from "../../../../CustomSelectors/CustomItemSelector";
import {IOptions, nodeOptions} from "../../../../../../store/Options/CustomSelecrorsOptions";
import {useSelector} from "react-redux";
import {selectItemType, selectWorkBenchType} from "../../../../../../store/GMProfit/gm-profit-selectors";
import {selectNodeIS} from "../../../../../../store/interface/interface-selector";
import {useAppDispatch} from "../../../../../../store";
import {interfaceSliceActions} from "../../../../../../store/interface/interface-slice";
import styles from './NodeSelector.module.scss';

const NodeSelector = () => {
    const dispatchAction = useAppDispatch();

    const selectedNode = useSelector(selectNodeIS);
    const itemTypeSelected = useSelector(selectItemType);

    const workBenchTypeSelected = useSelector(selectWorkBenchType);

    const setSelectedNode = (option: IOptions) => {
        dispatchAction(interfaceSliceActions.setSelectedNodeIS(option));
    }

    return (
        <CustomItemSelector
            setSelectedParams={setSelectedNode}
            paramsOptions={nodeOptions[workBenchTypeSelected][itemTypeSelected]!}
            paramState={selectedNode}
            customOptionSelectedClass={styles.customNodeOptionSelected}
            customOptionClass={styles.customNodeOption}
            selectInputClass={styles.selectNodeStyle}
            paramsSelectorClass={styles.nodeSelector}
        />
    )
}

export default NodeSelector;