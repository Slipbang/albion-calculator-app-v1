import CustomItemSelector from "../../../../../CustomSelectors/CustomItemSelector";
import {useSelector} from "react-redux";
import {selectItemTypeMM} from "../../../../../../../store/interface/interface-selector";
import {IOptions, typeOptions} from "../../../../../../../store/Options/CustomSelecrorsOptions";
import {useAppDispatch} from "../../../../../../../store";
import {interfaceSliceActions} from "../../../../../../../store/interface/interface-slice";
import styles from './TypeSelector.module.scss';

const TypeSelector = () => {
    const dispatchAction = useAppDispatch();

    const selectedItemType = useSelector(selectItemTypeMM);

    const setSelectedItemType = (option: IOptions) => {
        dispatchAction(interfaceSliceActions.setSelectedItemTypeMM(option))
    }

    return <CustomItemSelector
        setSelectedParams={setSelectedItemType}
        paramsOptions={typeOptions}
        paramState={selectedItemType}
        customOptionSelectedClass={styles.customOptionSelected}
        customOptionClass={styles.customOption}
        selectInputClass={styles.selectItemTypeStyle}
        paramsSelectorClass={styles.itemTypeSelector}
    />
}

export default TypeSelector;