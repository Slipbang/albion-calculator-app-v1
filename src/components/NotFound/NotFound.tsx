import styles from './NotFound.module.scss'
import {useSelector} from "react-redux";
import {selectTheme} from "../../store/interface/interface-selector";
import {NavLink} from "react-router-dom";
import StyledModalWindow from "../Calculator/StyledComponentsCommon/StyledModalWindow";
import {selectLanguage} from "../../store/language/language-selector";

const NotFound = () => {
    const theme = useSelector(selectTheme);
    const {language} = useSelector(selectLanguage)
    const {notFoundStings} = language;

    return (
        <>
            <StyledModalWindow />
            <div className={styles.notFoundStyles} data-theme={theme}>
                <div className={styles.textBox}>
                    <p>{notFoundStings.notFound}</p>
                </div>

                <div className={styles.svgBox} title={notFoundStings.returnTitle}>
                    <NavLink to='/'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="feather feather-arrow-left"
                        >
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                    </NavLink>
                </div>
            </div></>
    )
}
export default NotFound;