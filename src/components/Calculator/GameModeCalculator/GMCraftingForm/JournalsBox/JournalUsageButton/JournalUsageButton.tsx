import StyledCustomCheckButton from "../../../../StyledComponentsCommon/StyledCustomCheckButton";
import StyledInfoIcon from "../../GMCraftingFormSC/StyledInfoIcon";
import {useAppDispatch} from "../../../../../../store";
import {interfaceSliceActions} from "../../../../../../store/interface/interface-slice";
import {useSelector} from "react-redux";
import {selectDemoMode, selectGuide, selectJournalUsageCF} from "../../../../../../store/interface/interface-selector";
import styles from './JournalUsageButton.module.scss';
import {selectLanguage} from "../../../../../../store/language/language-selector";
import {useEffect, useRef} from "react";

const JournalUsageButton = () => {

    const isJournalUsed = useSelector(selectJournalUsageCF);
    const {language} = useSelector(selectLanguage);
    const {GMCraftingFormStrings} = language;
    const {script} = useSelector(selectGuide);
    const isDemo = useSelector(selectDemoMode);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const dispatchAction = useAppDispatch();

    const setIsJournalUsedHandler = () => {
        dispatchAction(interfaceSliceActions.setIsJournalsUsedCF())
    }

    useEffect(() => {
        if (script === 13) {
            buttonRef.current?.click();
            buttonRef.current?.focus();
        }
    }, [script])

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
                ref={buttonRef}
                $isDemo={isDemo}
                $isSelected={isJournalUsed}
                onClick={() => setIsJournalUsedHandler()}
            />
            <StyledInfoIcon title={GMCraftingFormStrings.journalInfoIconText}/>
        </div>
    )
}

export default JournalUsageButton;