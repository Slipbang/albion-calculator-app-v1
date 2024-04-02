import styles from './ErrorNotification.module.scss';
import StyledCloseButton from "../../StyledComponentsCommon/StyledCloseButton";
import {useAppDispatch} from "../../../../store";
import {interfaceSliceActions} from "../../../../store/interface/interface-slice";
import {useSelector} from "react-redux";
import {selectLanguage} from "../../../../store/language/language-selector";

const ErrorNotification = () => {
    const dispatchAction = useAppDispatch();
    const {language} = useSelector(selectLanguage);
    const {infoTableStrings} = language;

    const closeModalHandler = () => dispatchAction(interfaceSliceActions.setInfoTableVisibility(false));

    return (
        <div className={styles.notificationBox}>
            <StyledCloseButton onClick={() => closeModalHandler()}/>
            <div>
                <p>{infoTableStrings.errorNotification}</p>
            </div>
        </div>
    )
}

export default ErrorNotification;