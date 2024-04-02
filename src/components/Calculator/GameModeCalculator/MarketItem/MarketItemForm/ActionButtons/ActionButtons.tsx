import StyledActionMarketButton from "../../MarketItemSC/StyledActionMarketButton";
import {useSelector} from "react-redux";
import {selectMarketAction} from "../../../../../../store/GMProfit/gm-profit-selectors";
import styles from './ActionButtons.module.scss';
import {selectLanguage} from "../../../../../../store/language/language-selector";

const ActionButtons = () => {
    const {language} = useSelector(selectLanguage);
    const {marketItemStings} = language;

    const marketAction = useSelector(selectMarketAction);

    return <div className={styles.actionButtonsBox}>
        <div className={styles.actionLabel}>
            <p>{marketItemStings.actionLabel}</p>
        </div>

        <div className={styles.buttonsWrapper}>
             <div className={styles.buttonIsSelected}>
                <StyledActionMarketButton
                    $isButtonSelected={true}
                />
                <p>{marketAction === 'sell' ? marketItemStings.sell : marketItemStings.buy}</p>
            </div>
        </div>
    </div>
}

export default ActionButtons;