import CustomItemSelector from "../../../../../CustomSelectors/CustomItemSelector";
import {IOptions, tierOptions} from "../../../../../../../store/Options/CustomSelecrorsOptions"
import {useSelector} from "react-redux";
import {selectTierMM} from "../../../../../../../store/interface/interface-selector";
import {interfaceSliceActions} from "../../../../../../../store/interface/interface-slice";
import {useAppDispatch} from "../../../../../../../store";
import styles from './TierSelector.module.scss';

const TierSelector = () => {
    const dispatchAction = useAppDispatch();

    const selectedTier = useSelector(selectTierMM);

    const setSelectedTier = (option: IOptions) => {
        dispatchAction(interfaceSliceActions.setSelectedTierMM(option));
    }

    return <CustomItemSelector
        setSelectedParams={setSelectedTier}
        paramsOptions={tierOptions}
        paramState={selectedTier}
        customOptionSelectedClass={styles.customOptionSelected}
        customOptionClass={styles.customOption}
        selectInputClass={styles.selectTierStyle}
        paramsSelectorClass={styles.tierSelector}
    />
}

export default TierSelector;