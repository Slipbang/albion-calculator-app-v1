import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {IOptions} from "../../../store/Options/CustomSelecrorsOptions";
import {useSelector} from "react-redux";
import {selectLanguage} from "../../../store/language/language-selector";
import {selectGuide} from "../../../store/interface/interface-selector";

interface ICustomItemSelectorProps {
    selectInputClass: string;
    paramsSelectorClass: string;
    customOptionSelectedClass: string;
    customOptionClass: string;
    setSelectedParams: Dispatch<SetStateAction<IOptions>> | ((option: IOptions) => void);
    paramsOptions: IOptions[];
    paramState: IOptions;
    disabled?: boolean;
}

const CustomItemSelector = (props: ICustomItemSelectorProps) => {
    const {
        selectInputClass,
        paramsSelectorClass,
        paramsOptions,
        paramState,
        customOptionClass,
        customOptionSelectedClass,
        setSelectedParams,
        disabled,
    } = props;

    const {selectedLanguage} = useSelector(selectLanguage);

    const inputRef = useRef<HTMLDivElement>(null)

    const {script} = useSelector(selectGuide);

    const [selectedOptionParams,setSelectedOptionParams] = useState('');
    const [isSelectorVisible, setIsSelectorVisible] = useState(false);

    const setVisibility = (disabled: boolean | undefined) => {
        if (disabled === false || disabled === undefined) {
            setIsSelectorVisible(prevState => !prevState)
        }
    }

    useEffect(() => {
        const clickOutsideSelectorHandler = (event: MouseEvent) => {
            if (!event.composedPath().includes(inputRef.current!)) {
                setIsSelectorVisible(false);
            }
        }

        if (script === 20) {
            setTimeout(() => inputRef.current?.click(), 200)
        }

        document.body.addEventListener('click', clickOutsideSelectorHandler);

        return () => {
            document.body.removeEventListener('click', clickOutsideSelectorHandler);
        }
    }, [inputRef, script])

    return (
        <div
            onClick={() => setVisibility(disabled)}
            key={paramsOptions[0].value}
            ref={inputRef}
            className={selectInputClass}
        >
            <p>{paramState.labelName[selectedLanguage]}</p>
            {!!isSelectorVisible && <div className={paramsSelectorClass}>
                <div style={{paddingTop: '15px'}}>
                    {paramsOptions.map(({value, params, labelName}, index) => {

                        return (
                            <div key={index}>
                                <p
                                    className={paramState.value === paramsOptions[index].value || (selectedOptionParams === value && !!params) ? customOptionSelectedClass : customOptionClass}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        setIsSelectorVisible(false);
                                        setSelectedParams(paramsOptions[index]);
                                    }}
                                    onMouseEnter={() => {
                                        if (!!params) setSelectedOptionParams(value);
                                    }}
                                >{labelName[selectedLanguage]}</p>

                                {!!params && selectedOptionParams === value && <div style={{position: "absolute", marginTop: '-19px', left: '118px', width: '120px', borderTop: '4px solid rgb(183, 144, 108)'}} className={paramsSelectorClass}>
                                    {params.map((param, index1) => {
                                        return <div key={param.value}>
                                            <p
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    setSelectedParams(paramsOptions[index].params![index1]);
                                                    setIsSelectorVisible(false);
                                                }}
                                                className={paramState.value === paramsOptions[index].params![index1].value ? customOptionSelectedClass : customOptionClass}
                                            >{param.labelName[selectedLanguage]}</p>
                                        </div>
                                    })}
                                </div>}
                            </div>
                        )
                    })}
                </div>
            </div>}
        </div>
    )
}

export default CustomItemSelector;