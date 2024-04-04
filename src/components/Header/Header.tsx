import styles from './Header.module.scss';

import MobileNavigationLinks from "./NavigationLinks/MobileNavigationLinks/MobileNavigationLinks";
import WideScreenNavigationLinks from "./NavigationLinks/WideScreenNavigationLinks/WideScreenNavigationLinks";
import Settings from "./Settings/Settins";

const Header = () => {

    return <div className={styles.header}>
        <MobileNavigationLinks />

        <WideScreenNavigationLinks />

        <h1 className={styles.headerTextStyles}></h1>

        <Settings />
    </div>
}

export default Header;