import styles from './Header.module.scss';

import MobileNavigationLinks from "./NavigationLinks/MobileNavigationLinks/MobileNavigationLinks";
import WideScreenNavigationLinks from "./NavigationLinks/WideScreenNavigationLinks/WideScreenNavigationLinks";
import Settings from "./Settings/Settins";
import {useSelector} from "react-redux";
import {selectTheme} from "../../store/interface/interface-selector";
import {Link, Outlet} from "react-router-dom";

const Header = () => {

    const theme = useSelector(selectTheme);
    return (
        <>
            <div className={styles.header} data-theme={theme}>
                <MobileNavigationLinks />

                <WideScreenNavigationLinks />

                <Link to='/' className={styles.headerLink}>
                    <h1 className={styles.headerTextStyles}></h1>
                </Link>

                <Settings />
            </div>

            <Outlet />
        </>
    )
}

export default Header;