import styles from './GuideButton.module.scss';
import {useAppDispatch} from "../../../../store";
import {interfaceSliceActions} from "../../../../store/interface/interface-slice";
import {GMProfitSliceActions} from "../../../../store/GMProfit/gm-profit-slice";

const GuideButton = () => {
    const dispatchAction = useAppDispatch();

    const turnDemoOnHandler = () => {
        dispatchAction(interfaceSliceActions.setIsDemo(true));
        dispatchAction(GMProfitSliceActions.resetBackpack());
    }

    return (
        <button
            onClick={() => turnDemoOnHandler()}
            className={styles.guideButton}
        >Guide</button>
    )
}

export default GuideButton;