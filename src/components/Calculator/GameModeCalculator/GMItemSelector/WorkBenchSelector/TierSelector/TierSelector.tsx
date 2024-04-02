import CustomItemSelector from "../../../../CustomSelectors/CustomItemSelector";
import {IOptions, tierOptions} from "../../../../../../store/Options/CustomSelecrorsOptions";
import {useSelector} from "react-redux";
import {selectTierIS} from "../../../../../../store/interface/interface-selector";
import {interfaceSliceActions} from "../../../../../../store/interface/interface-slice";
import {useAppDispatch} from "../../../../../../store";
import styles from './TierSelector.module.scss';

const TierSelector = () => {
    const dispatchAction = useAppDispatch();

    const selectedTier = useSelector(selectTierIS);

    const setSelectedTier = (option: IOptions) => {
        dispatchAction(interfaceSliceActions.setSelectedTierIS(option));
    }

    const filteredTierOptions = tierOptions.filter(item => !item.value.includes('T3'));

    return (
        <CustomItemSelector
            setSelectedParams={setSelectedTier}
            paramsOptions={filteredTierOptions}
            paramState={selectedTier}
            customOptionSelectedClass={styles.customTierOptionSelected}
            customOptionClass={styles.customTierOption}
            selectInputClass={styles.selectTierStyle}
            paramsSelectorClass={styles.tierSelector}
        />
    )
}

export default TierSelector;