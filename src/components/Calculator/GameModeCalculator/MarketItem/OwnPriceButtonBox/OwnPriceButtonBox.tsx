import StyledCustomCheckButton from "../../../StyledComponentsCommon/StyledCustomCheckButton";
import {useAppDispatch} from "../../../../../store";
import {interfaceSliceActions} from "../../../../../store/interface/interface-slice";
import {useSelector} from "react-redux";
import {selectDemoMode, selectGuide, selectPriceFetchedState} from "../../../../../store/interface/interface-selector";
import styles from './OwnPriceButtonBox.module.scss';
import {selectLanguage} from "../../../../../store/language/language-selector";
import {useEffect, useRef} from "react";

const OwnPriceButtonBox = () => {
    const dispatchAction = useAppDispatch();
    const isPriceFetched = useSelector(selectPriceFetchedState);
    const {script} = useSelector(selectGuide);
    const {language} = useSelector(selectLanguage);
    const {marketItemStings} = language;
    const isDemo = useSelector(selectDemoMode);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const setIsPriceFetchedHandler = () => {
        dispatchAction(interfaceSliceActions.setIsPriceFetchedMI())
    }

    useEffect(() => {
        if (script === 5) {
            buttonRef.current?.click();
            buttonRef.current?.focus();
        }
    }, [script])

    return (
        <div className={styles.ownPriceButtonBox}>
            <p>{marketItemStings.ownPriceLabel}</p>
            <StyledCustomCheckButton
                $isDemo={isDemo}
                ref={buttonRef}
                style={{marginLeft: '15px'}}
                $isSelected={isPriceFetched}
                onClick={() => setIsPriceFetchedHandler()}
            />
        </div>
    )
}

export default OwnPriceButtonBox;