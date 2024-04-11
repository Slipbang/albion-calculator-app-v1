import StyledCustomCheckButton from "../../../StyledComponentsCommon/StyledCustomCheckButton";
import {useAppDispatch} from "../../../../../store";
import {interfaceSliceActions} from "../../../../../store/interface/interface-slice";
import {useSelector} from "react-redux";
import {selectPriceFetchedState} from "../../../../../store/interface/interface-selector";
import styles from './OwnPriceButtonBox.module.scss';
import {selectLanguage} from "../../../../../store/language/language-selector";

const OwnPriceButtonBox = () => {
    const dispatchAction = useAppDispatch();
    const isPriceFetched = useSelector(selectPriceFetchedState);
    const {language} = useSelector(selectLanguage);
    const {marketItemStings} = language;

    const setIsPriceFetchedHandler = () => {
        dispatchAction(interfaceSliceActions.setIsPriceFetchedMI())
    }

    return (
        <div className={styles.ownPriceButtonBox}>
            <p>{marketItemStings.ownPriceLabel}</p>
            <StyledCustomCheckButton
                style={{marginLeft: '15px'}}
                $isSelected={isPriceFetched}
                onClick={() => setIsPriceFetchedHandler()}
            />
        </div>
    )
}

export default OwnPriceButtonBox;