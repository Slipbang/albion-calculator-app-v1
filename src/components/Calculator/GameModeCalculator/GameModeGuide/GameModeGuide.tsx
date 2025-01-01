import {useAppDispatch} from "../../../../store";
import {interfaceSliceActions} from "../../../../store/interface/interface-slice";
import StyledCloseButton from "../../StyledComponentsCommon/StyledCloseButton";
import React, {useRef} from "react";
import {useSelector} from "react-redux";
import {
    selectGuide,
    selectInterfaceLanguageData, selectIsNextButtonDisabled,
    selectItemsDataLoading
} from "../../../../store/interface/interface-selector";
import StyledDefaultButton from "../../StyledComponentsCommon/StyledDefaultButton";
import {guideActions, TActionSequence} from "./guideActions";
import StyledGuideBoard from "./GameModeGuideSC/StyledGuideBoard";
import {GMProfitSliceActions} from "../../../../store/GMProfit/gm-profit-slice";
import {selectLanguage} from "../../../../store/language/language-selector";
import {TSelectedLanguage} from "../../../../types/languageTypes";

const GameModeGuide = () => {
    const dispatchAction = useAppDispatch();

    const {script} = useSelector(selectGuide);
    const {selectedLanguage} = useSelector(selectLanguage);
    const languageData = useSelector(selectInterfaceLanguageData);
    const {language} = useSelector(selectLanguage);
    const {guideStrings} = language;
    const isItemsDataLoading = useSelector(selectItemsDataLoading);
    const isNextButtonDisabled = useSelector(selectIsNextButtonDisabled);

    function* doNextActionsGenerator(actionSequence: TActionSequence) {
        for (const { actions } of actionSequence) {
            yield function (selectedLanguage: TSelectedLanguage) {
                for (let [action, value] of actions) {
                    if (typeof value === 'string' && value?.includes('T6_')) {
                        value = languageData?.[value][selectedLanguage];
                    }

                    dispatchAction(action(value));
                }
            }
        }
    }

    let generatorRef = useRef(doNextActionsGenerator(guideActions));

    const closeGuideHandler = () => {
        dispatchAction(interfaceSliceActions.setIsDemo(false));
        dispatchAction(interfaceSliceActions.setGuideScript(0));
        dispatchAction(interfaceSliceActions.toggleMarketMenuShown(false));
        dispatchAction(interfaceSliceActions.setIsCraftingFormVisible(false));
        dispatchAction(interfaceSliceActions.resetMarketMenuSelectors());
        dispatchAction(GMProfitSliceActions.resetBackpack());
        dispatchAction(GMProfitSliceActions.setFoodTax(0));
        dispatchAction(interfaceSliceActions.setIsJournalsUsedCF(false));
        dispatchAction(interfaceSliceActions.setMarketItemVisibility(false));
        dispatchAction(interfaceSliceActions.setIsJournalPriceFetchedCF(false));
        dispatchAction(interfaceSliceActions.setIsArtefactPriceFetchedCF(false));
        dispatchAction(interfaceSliceActions.setIsPriceFetchedMI(false));
        dispatchAction(GMProfitSliceActions.setMarketTypeAction('buy'));
        dispatchAction(interfaceSliceActions.setGuidePosition('center'))

        generatorRef.current = doNextActionsGenerator(guideActions);
    }

    const isButtonDisabled = () => {
        return script === 24 || isItemsDataLoading || isNextButtonDisabled;
    }

    return (
        <StyledGuideBoard>
            <StyledCloseButton
                onClick={() => closeGuideHandler()}
                onMouseDown={(event) => event.preventDefault()}
            />
            <p>{guideStrings[script]}</p>

            <StyledDefaultButton
                onClick={() => {
                    const next = generatorRef.current.next();
                    if (!next.done && next.value) {
                        next.value(selectedLanguage);
                    }
                }}
                $width={80}
                $height={30}
                disabled={isButtonDisabled()}
            >Next</StyledDefaultButton>
        </StyledGuideBoard>
    )
}

export default GameModeGuide;