import styles from './Header.module.scss';

import MobileNavigationLinks from "./NavigationLinks/MobileNavigationLinks/MobileNavigationLinks";
import WideScreenNavigationLinks from "./NavigationLinks/WideScreenNavigationLinks/WideScreenNavigationLinks";
import Settings from "./Settings/Settins";
import {useSelector} from "react-redux";
import {selectTheme} from "../../store/interface/interface-selector";

const Header = () => {

    const theme = useSelector(selectTheme);
    return (
        <div className={styles.header} data-theme={theme}>
            <MobileNavigationLinks />

            <WideScreenNavigationLinks />

            <h1 className={styles.headerTextStyles}></h1>


            <Settings />
        </div>
    )
}

export default Header;