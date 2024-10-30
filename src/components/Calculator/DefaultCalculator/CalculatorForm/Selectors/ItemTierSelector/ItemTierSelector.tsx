import {arrowRight} from "../../../DefaultCalculatorImgReexports/DefaultCalculatorImgReexports";
import {profitSliceActions} from "../../../../../../store/profit/profit-slice";
import React, {useEffect, useRef, useState} from "react";
import {useAppDispatch} from "../../../../../../store";
import {ISelectedLanguage, TSelectedLanguage} from "../../../../../../types/languageTypes";
import {useDefineSelectorImg} from "../../Hooks/useDefineSelectorImg";
import styles from './ItemTierSelector.module.scss'
import {TTier} from "../../../../../../types/craftItemsType";
import {srcRoute} from "../../../../../../store/api/api";
import {useSelector} from "react-redux";
import {selectInterfaceLanguageData} from "../../../../../../store/interface/interface-selector";

interface IItemTierSelectorProps {
    calculatorFormStrings: ISelectedLanguage['calculatorFormStrings'];
    selectedLanguage: TSelectedLanguage;
}

const ItemTierSelector = (props: IItemTierSelectorProps) => {
    const {calculatorFormStrings, selectedLanguage} = props;

    const dispatchAction = useAppDispatch();
    const languageData = useSelector(selectInterfaceLanguageData);

    const {
        selectorImg,
        selectedItemId,
        selectedItemTier,
    } = useDefineSelectorImg();

    const itemName = languageData[`${selectedItemTier}_${selectedItemId}`];

    const [isItemTierSelectorShown, setIsItemTierSelectorShown] = useState(false);
    const tierSelectorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const clickOutSideTierSelectorHandler = (event: MouseEvent) => {
            if (!event.composedPath().includes(tierSelectorRef.current!)) {
                setIsItemTierSelectorShown(false);
            }
        }

        document.body.addEventListener('click', clickOutSideTierSelectorHandler);

        return () => {
            document.body.removeEventListener('click', clickOutSideTierSelectorHandler);
        };
    }, []);

    const selectItemTierHandler = (tier: TTier) => {
        dispatchAction(profitSliceActions.setSelectedItemTier(tier))
    }

    return (
        <div className={styles.wrapper}>
            <p>{calculatorFormStrings.itemTier}</p>
            <div
                id='itemTierSelector'
                className={styles.selectedItem}
                ref={tierSelectorRef}
                onClick={() => setIsItemTierSelectorShown(prevState => !prevState)}
            >
                <img
                    style={{marginLeft: 20}}
                    className={styles.backgroundSkeleton}
                    title={`${itemName?.[selectedLanguage] || ''} ${selectedItemTier}`}
                    src={selectorImg}
                    alt=""
                />
                {isItemTierSelectorShown && (
                    <div className={styles.itemTierSelector}>
                        <img
                            src={arrowRight}
                            alt=''
                            style={{width: '11px', height: '50px'}}
                        />
                        <div className={styles.itemTierButtonSelector}>
                            {['T4', 'T5', 'T6', 'T7', 'T8'].map(tier => {

                                    return (
                                        <span key={tier}>
                                            <img
                                                className={styles.backgroundSkeleton}
                                                title={tier}
                                                src={`${srcRoute}${tier}_${selectedItemId.split(/T\d_/)[1]}`}
                                                alt=''
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    selectItemTierHandler(tier as TTier);
                                                    setIsItemTierSelectorShown(false);
                                                }}
                                            />
                                        </span>
                                    )
                                }
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ItemTierSelector;