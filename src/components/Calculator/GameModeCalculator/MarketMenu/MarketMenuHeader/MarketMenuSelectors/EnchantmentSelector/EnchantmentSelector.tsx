import CustomItemSelector from "../../../../../CustomSelectors/CustomItemSelector";
import {enchantmentOptions, IOptions} from "../../../../../../../store/Options/CustomSelecrorsOptions";
import {useSelector} from "react-redux";
import {selectEnchantmentMM} from "../../../../../../../store/interface/interface-selector";
import {useAppDispatch} from "../../../../../../../store";
import {interfaceSliceActions} from "../../../../../../../store/interface/interface-slice";

import styles from './EnchantmentSelector.module.scss'

const EnchantmentSelector = () => {
    const dispatchAction = useAppDispatch();

    const selectedEnchantment = useSelector(selectEnchantmentMM);

    const setSelectedEnchantment = (option: IOptions) => {
        dispatchAction(interfaceSliceActions.setSelectedEnchantmentMM(option));
    }

    return <CustomItemSelector
        setSelectedParams={setSelectedEnchantment}
        paramsOptions={enchantmentOptions}
        paramState={selectedEnchantment}
        customOptionSelectedClass={styles.customOptionSelected}
        customOptionClass={styles.customOption}
        selectInputClass={styles.selectEnchantmentStyle}
        paramsSelectorClass={styles.enchantmentSelector}
    />
}

export default EnchantmentSelector;