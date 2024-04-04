import {languageSwitcherActions} from "../../../store/language/languageSwitcher-slice";
import {useAppDispatch} from "../../../store";
import styles from './LanguageSwitchButton.module.scss'

const LanguageSwitchButton = (props: { isSelectedRu: boolean }) => {
    const {isSelectedRu} = props;

    const dispatchAction = useAppDispatch();

    const changeLanguageHandler = () => {
        dispatchAction(languageSwitcherActions.changeLanguageHandler());
    }

    return <button
        onClick={changeLanguageHandler}
        className={isSelectedRu ? styles.ruLanguage : styles.enLanguage}
    />
}

export default LanguageSwitchButton;