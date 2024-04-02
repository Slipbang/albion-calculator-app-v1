import {selectLanguage} from "../../store/language/language-selector";

import styles from './Header.module.scss';

import {useSelector} from "react-redux";

import MobileNavigationLinks from "./NavigationLinks/MobileNavigationLinks/MobileNavigationLinks";
import LanguageSwitchButton from "./LanguageSwitchButton/LanguageSwitchButton";
import WideScreenNavigationLinks from "./NavigationLinks/WideScreenNavigationLinks/WideScreenNavigationLinks";

const Header = () => {
    const {selectedLanguage} = useSelector(selectLanguage);

    const isSelectedRu = selectedLanguage === 'ru';

    return <div className={styles.header}>
        <MobileNavigationLinks
            selectedLanguage={selectedLanguage}
        />

        <WideScreenNavigationLinks
            selectedLanguage={selectedLanguage}
        />

        <h1 className={styles.headerTextStyles}></h1>

        <LanguageSwitchButton
            isSelectedRu={isSelectedRu}
        />
    </div>
}

export default Header;