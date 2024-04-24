import styles from './FAQ.module.scss'
import {useSelector} from "react-redux";
import {selectLanguage} from "../../store/language/language-selector";

const FAQ = () => {

    const {language} = useSelector(selectLanguage);
    const {FAQStrings} = language;

    return (
        <div className={styles.FAQStyles}>
            <p>{FAQStrings.description1} <a href="https://github.com/Slipbang" target='_blank'> Slipbang</a></p>

            <br/>

            <p>{FAQStrings.description2} <a href="https://albion-profit-calculator.com" target='_blank'>https://albion-profit-calculator.com</a>!</p>

            <br/>

            <p>{FAQStrings.description3} <a href="https://discordapp.com/users/150513063311835136" target='_blank'>Discord</a>.</p>
        </div>
    )
}

export default FAQ;