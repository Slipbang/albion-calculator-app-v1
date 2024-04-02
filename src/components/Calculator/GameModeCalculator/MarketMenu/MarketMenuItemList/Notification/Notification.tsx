import React from "react";
import {useSelector} from "react-redux";
import {selectBackpackItems, selectMarketAction} from "../../../../../../store/GMProfit/gm-profit-selectors";
import styles from './Notification.module.scss'
import {selectLanguage} from "../../../../../../store/language/language-selector";

const NotificationMM = () => {

    const marketActionSelected = useSelector(selectMarketAction);
    const backpackItems = useSelector(selectBackpackItems);
    const {language} = useSelector(selectLanguage);
    const {marketMenuStrings} = language;

    const isBackPackEmpty = () => {
        let isEmpty = true;

        backpackItems.some(item => {
            if (item.itemQuantity !== null){
                isEmpty = false;

                return true;
            }
        })

        return isEmpty;
    }

    return <>
        {marketActionSelected === 'sell' && !!isBackPackEmpty() && <div className={styles.notification}>
            <div>{marketMenuStrings.alert}</div>
        </div>}
    </>
}

export default NotificationMM;