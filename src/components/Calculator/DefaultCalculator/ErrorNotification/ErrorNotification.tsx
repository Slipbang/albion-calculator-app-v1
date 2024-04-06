import styles from './ErrorNotification.module.scss';
import StyledCloseButton from "../../StyledComponentsCommon/StyledCloseButton";
import {useAppDispatch} from "../../../../store";
import {interfaceSliceActions, TTheme} from "../../../../store/interface/interface-slice";
import {useSelector} from "react-redux";
import {selectLanguage} from "../../../../store/language/language-selector";

const ErrorNotification = ({theme}: {theme: TTheme}) => {
    const dispatchAction = useAppDispatch();
    const {language} = useSelector(selectLanguage);
    const {infoTableStrings} = language;

    const closeModalHandler = () => dispatchAction(interfaceSliceActions.setInfoTableVisibility(false));

    return (
        <div
            className={styles.notificationBox}
            data-theme={theme}
        >
            <StyledCloseButton onClick={() => closeModalHandler()}/>
            <div>
                <p>{infoTableStrings.errorNotification}</p>
            </div>
        </div>
    )
}

export default ErrorNotification;