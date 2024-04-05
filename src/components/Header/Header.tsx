import styles from './Header.module.scss';

import MobileNavigationLinks from "./NavigationLinks/MobileNavigationLinks/MobileNavigationLinks";
import WideScreenNavigationLinks from "./NavigationLinks/WideScreenNavigationLinks/WideScreenNavigationLinks";
import Settings from "./Settings/Settins";
import {useSelector} from "react-redux";
import {selectThemeState} from "../../store/interface/interface-selector";

const Header = () => {

    const isDark = useSelector(selectThemeState);
    return (
        <div className={styles.header} data-theme={isDark ? 'dark' : 'light'}>
            <MobileNavigationLinks />

            <WideScreenNavigationLinks />

            <h1 className={styles.headerTextStyles}></h1>

            <Settings />
        </div>
    )
}

export default Header;