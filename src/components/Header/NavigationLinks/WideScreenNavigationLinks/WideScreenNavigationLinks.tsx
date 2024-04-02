import {NavLink} from "react-router-dom";
import {links} from "../NavigationLinks";
import styles from './WideScreenNavigationLinks.module.scss'

const WideScreenNavigationLinks = ({selectedLanguage}: {selectedLanguage: 'ru' | 'en'}) => {

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