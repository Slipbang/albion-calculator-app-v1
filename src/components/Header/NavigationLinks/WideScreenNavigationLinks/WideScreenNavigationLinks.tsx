import {NavLink} from "react-router-dom";
import {links} from "../NavigationLinks";
import styles from './WideScreenNavigationLinks.module.scss'
import {TSelectedLanguage} from "../../../../types/languageTypes";
import {useSelector} from "react-redux";
import {selectLanguage} from "../../../../store/language/language-selector";

const WideScreenNavigationLinks = () => {
    const {selectedLanguage} = useSelector(selectLanguage);

    return <div className={styles.fullScreenLinks}>
        {links.map(({link, linkName}) =>
            <NavLink
                key={link}
                className={({isActive}) => isActive ? styles.activeLink : styles.link}
                to={link}
            >{linkName?.[selectedLanguage]}</NavLink>
        )}
    </div>
}

export default WideScreenNavigationLinks;