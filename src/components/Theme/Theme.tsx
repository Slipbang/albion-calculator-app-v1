import {useSelector} from "react-redux";
import {selectThemeState} from "../../store/interface/interface-selector";
import styles from './Theme.module.scss'

export const Theme = () => {
    const isDark = useSelector(selectThemeState);

    return <div className={styles.theme} data-theme={isDark ? 'dark' : 'light'}/>
}

export default Theme;