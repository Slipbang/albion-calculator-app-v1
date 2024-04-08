import styles from './Home.module.scss';
import {Link} from "react-router-dom";
import AlbionToolkitSVG from "./AlbionToolkitSVG/AlbionToolkitSVG";
import {useSelector} from "react-redux";
import {selectLanguage} from "../../store/language/language-selector";
import {languageOptions} from "../../store/Options/SettingsOptions";
import {useAppDispatch} from "../../store";
import {languageSwitcherActions} from "../../store/language/language-slice";
import {TSelectedLanguage} from "../../types/languageTypes";

const Home = () => {
    const dispatchAction = useAppDispatch();

    const {language} = useSelector(selectLanguage);
    const {homeStrings} = language;

    const selectLanguageHandler = (language: TSelectedLanguage) => {
        dispatchAction(languageSwitcherActions.changeLanguageHandler(language))
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.sectionWrapper}>
                <div className={`${styles.artefactsLink} ${styles.sectionBox}`}>
                    <Link to='/artefacts'>{homeStrings.artefacts}</Link>

                    <div className={styles.textBox}>
                        <p>{homeStrings.artefactsDescription}</p>
                    </div>
                </div>

                <div className={`${styles.calculatorLink} ${styles.sectionBox}`}>
                    <Link to='/calculator'>{homeStrings.craftCalculator}</Link>

                    <AlbionToolkitSVG/>

                    <div className={styles.textBox}>
                        <p>{homeStrings.craftCalculatorDescription}</p>
                    </div>
                </div>

                <div className={`${styles.transportationLink} ${styles.sectionBox}`}>
                    <Link to='/transportation'>{homeStrings.transportation}</Link>

                    <div className={styles.textBox}>
                        <p>{homeStrings.transportationDescription}</p>
                    </div>
                </div>
            </div>

            <footer>
                <div className={styles.language}>
                    <p>{homeStrings.language}</p>

                    <ul>
                        {languageOptions.map(({label,value}) => {

                            return <li key={label} onClick={() => selectLanguageHandler(value)}>{label}</li>
                        })}
                    </ul>

                </div>

                <a href='https://www.albion-online-data.com' target='_blank'>Powered by Albion Online Data Project</a>
            </footer>
        </div>
    )
}

export default Home;