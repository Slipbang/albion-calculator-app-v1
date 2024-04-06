import {useSelector} from "react-redux";
import {selectTheme} from "../../store/interface/interface-selector";
import styles from './Theme.module.scss'

export const Theme = () => {
    const theme = useSelector(selectTheme);

    return <div className={styles.theme} data-theme={theme}/>
}

export default Theme;