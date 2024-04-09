import styles from './Settins.module.scss'
import {useSelector} from "react-redux";
import {selectLanguage} from "../../../store/language/language-selector";
import {useAppDispatch} from "../../../store";
import {languageSwitcherActions} from "../../../store/language/language-slice";
import {TSelectedLanguage} from "../../../types/languageTypes";
import {selectServerId} from "../../../store/queryParams/query-params-selectors";
import {queryParamsSliceActions} from "../../../store/queryParams/query-params-slice";
import {interfaceSliceActions} from "../../../store/interface/interface-slice";
import {languageOptions, serverOptions} from "../../../store/Options/SettingsOptions";

const Settings = () => {
    const dispatchAction = useAppDispatch();
    const {selectedLanguage, language} = useSelector(selectLanguage);
    const {headerStrings} = language;

    const selectThemeHandler = () => {
        dispatchAction(interfaceSliceActions.setTheme());
    }

    const serverId = useSelector(selectServerId);

    const selectServerHandler = (value: string) => {
        dispatchAction(queryParamsSliceActions.setServer(value))
    }

    const selectLanguageHandler = (value: TSelectedLanguage) => {
        dispatchAction(languageSwitcherActions.changeLanguageHandler(value));
    }

    return (
        <div className={styles.wrapper}>

            <div className={styles.settingsSVG}>
                <svg
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="feather feather-settings">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path
                        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
            </div>

            <div className={styles.serverNotificationText}>{serverOptions.find(option => option.value === serverId)?.labelName[selectedLanguage]}</div>

            <div className={styles.settings}>

                <div className={styles.themeWrapper}>

                    <div className={styles.theme} onClick={() => selectThemeHandler()}>

                        <div className={styles.sun}>✷</div>

                        <div className={styles.moon}></div>

                    </div>
                </div>

                <div className={styles.selectors}>
                    <p>{headerStrings.server}</p>
                    <div className={styles.options}>
                        {serverOptions.map(({value, labelName}) => {
                            return (
                                <p
                                    key={value}
                                    className={value === serverId ? styles.selected : ''}
                                    onClick={() => selectServerHandler(value)}
                                >{labelName[selectedLanguage]}</p>
                            )
                        })}
                    </div>
                </div>

                <div className={styles.selectors}>
                    <p>{headerStrings.language}</p>
                    <div className={styles.options}>
                        {languageOptions.map(({label, value}) => {
                            return (
                                <p
                                    key={value}
                                    className={value === selectedLanguage ? styles.selected : ''}
                                    onClick={() => selectLanguageHandler(value)}
                                >{label}</p>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;