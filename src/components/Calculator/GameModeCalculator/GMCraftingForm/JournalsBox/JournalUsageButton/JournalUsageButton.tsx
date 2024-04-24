import StyledCustomCheckButton from "../../../../StyledComponentsCommon/StyledCustomCheckButton";
import StyledInfoIcon from "../../GMCraftingFormSC/StyledInfoIcon";
import {useAppDispatch} from "../../../../../../store";
import {interfaceSliceActions} from "../../../../../../store/interface/interface-slice";
import {useSelector} from "react-redux";
import {selectJournalUsageCF} from "../../../../../../store/interface/interface-selector";
import styles from './JournalUsageButton.module.scss';
import {selectLanguage} from "../../../../../../store/language/language-selector";

const JournalUsageButton = () => {

    const isJournalUsed = useSelector(selectJournalUsageCF);
    const {language} = useSelector(selectLanguage);
    const {GMCraftingFormStrings} = language;

    const dispatchAction = useAppDispatch();

    const setIsJournalUsedHandler = () => {
        dispatchAction(interfaceSliceActions.setIsJournalsUsedCF())
    }

    return (
        <div
            className={styles.journalUsageButton}
            draggable={true}
            onDragStart={event => event.preventDefault()}
            onDragOver={event => event.preventDefault()}
            onDrag={event => event.preventDefault()}
            onDragEnter={event => event.preventDefault()}
        >
            <p>{GMCraftingFormStrings.journalUsageButton}</p>
            <StyledCustomCheckButton
                $isSelected={isJournalUsed}
                onClick={() => setIsJournalUsedHandler()}
            />
            <StyledInfoIcon title={GMCraftingFormStrings.journalInfoIconText}/>
        </div>
    )
}

export default JournalUsageButton;