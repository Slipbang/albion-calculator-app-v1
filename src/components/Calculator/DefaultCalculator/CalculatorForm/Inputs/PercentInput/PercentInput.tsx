import StyledCalculatorFormSelector from "../../CalculatorFormSC/StyledCalculatorFormSelector";
import CustomItemSelector from "../../../../CustomSelectors/CustomItemSelector";
import React, {ChangeEventHandler, useCallback, useEffect, useRef, useState} from "react";
import {profitSliceActions} from "../../../../../../store/profit/profit-slice";
import {useAppDispatch} from "../../../../../../store";
import debounce from "lodash.debounce";
import {IOptions} from "../../../../../../store/Options/CustomSelecrorsOptions";
import StyledCustomCheckButton from "../../../../StyledComponentsCommon/StyledCustomCheckButton";
import {ISelectedLanguage} from "../../../../../../types/languageTypes";
import styles from './PercentInput.module.scss';
import {useSelector} from "react-redux";
import {selectPercent} from "../../../../../../store/profit/profit-selectors";

export const percentOptions: IOptions[] = [
    {
        labelName: {
          ru: '15.2',
          en: '15.2',
        },
        value: '15.2',
    },
    {
        labelName: {
          ru: '24.8',
          en: '24.8',
        },
        value: '24.8',
    },
    {
        labelName: {
          ru: '30.0',
          en: '30.0',
        },
        value: '30.0',
    },
    {
        labelName: {
          ru: '36.7',
          en: '36.7',
        },
        value: '36.7',
    },
    {
        labelName: {
          ru: '40.4',
          en: '40.4',
        },
        value: '40.4',
    },
    {
        labelName: {
          ru: '43.5',
          en: '43.5',
        },
        value: '43.5',
    },
    {
        labelName: {
          ru: '47.9',
          en: '47.9',
        },
        value: '47.9',
    },
    {
        labelName: {
          ru: '53.9',
          en: '53.9',
        },
        value: '53.9',
    },
];

interface IPercentInputProps {
    calculatorFormStrings: ISelectedLanguage['calculatorFormStrings'];
}

const PercentInput = (props: IPercentInputProps) => {
    const {calculatorFormStrings} = props;

    const dispatchAction = useAppDispatch();
    const percent = useSelector(selectPercent)

    const inputPercentRef = useRef<HTMLInputElement>(null);

    const [isOwnPercent, setIsOwnPercent] = useState(false);
    const [selectedPercent, setSelectedPercent] = useState(percentOptions[0]);

    const changeInputPercentHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatchAction(profitSliceActions.setPercent(+event.target.value));
    }

    const focusHandler = useCallback(debounce(() => {
        inputPercentRef.current?.focus();
    }, 1), []);

    const chooseMethodHandler = (status: boolean) => {
        if (!status) {
            setIsOwnPercent(true);
            focusHandler();
        } else {
            setIsOwnPercent(false);
            dispatchAction(profitSliceActions.setPercent(15.2))
        }
    }

    const changeSelectorPercentHandler = () => {
        dispatchAction(profitSliceActions.setPercent(+selectedPercent.value));
    }

    useEffect(() => {
        changeSelectorPercentHandler();
    }, [selectedPercent, isOwnPercent]);

    return (
        <div className={styles.wrapper}>
            <div
                style={{width: '225px'}}
                className={styles.boxContent}
            >
                <p>{calculatorFormStrings.labelOwnPercent}</p>
                <StyledCustomCheckButton
                    $isSelected={isOwnPercent}
                    style={{marginLeft: '15px'}}
                    onClick={(event) => {
                        event.preventDefault();
                        chooseMethodHandler(isOwnPercent)
                    }}
                />
            </div>


            <div
                style={{width: '320px'}}
                className={styles.boxContent}
            >
                <p>{calculatorFormStrings.labelPercent}</p>
                <StyledCalculatorFormSelector>
                    {!isOwnPercent && <CustomItemSelector
                        setSelectedParams={setSelectedPercent}
                        paramsOptions={percentOptions}
                        paramState={selectedPercent}
                        paramsSelectorClass={styles.percentSelector}
                        customOptionSelectedClass={styles.customPercentOptionSelected}
                        customOptionClass={styles.customPercentOption}
                        selectInputClass={styles.selectPercentStyle}
                    />}

                    {!!isOwnPercent && <input
                        ref={inputPercentRef}
                        value={percent}
                        id='CFReturnPercentInput'
                        type="number"
                        onFocus={() => inputPercentRef.current?.select()}
                        onChange={event => changeInputPercentHandler(event)}
                        onKeyDown={event => {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                inputPercentRef.current!.blur();
                            }
                        }}
                        step={0.1}
                    />}
                </StyledCalculatorFormSelector>
            </div>
        </div>
    )
}

export default PercentInput;