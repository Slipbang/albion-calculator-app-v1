import {arrowRight} from "../../../DefaultCalculatorImgReexports/DefaultCalculatorImgReexports";
import {profitSliceActions} from "../../../../../../store/profit/profit-slice";
import React, {useEffect, useRef, useState} from "react";
import {useAppDispatch} from "../../../../../../store";
import {ISelectedLanguage, TSelectedLanguage} from "../../../../../../types/languageTypes";
import {useDefineSelectorImg} from "../../Hooks/useDefineSelectorImg";
import styles from './ItemTierSelector.module.scss'
import {TTier} from "../../../../../../types/craftItemsType";

interface IItemTierSelectorProps {
    calculatorFormStrings: ISelectedLanguage['calculatorFormStrings'];
    selectedLanguage: TSelectedLanguage;
}

const ItemTierSelector = (props: IItemTierSelectorProps) => {
    const {calculatorFormStrings, selectedLanguage} = props;

    const dispatchAction = useAppDispatch();

    const {selectorImg, selectedItemType, selectedItemBodyId, selectedItemTier, itemName} = useDefineSelectorImg();

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

    const srcRoute = 'https://render.albiononline.com/v1/item/';

    return (
        <div className={styles.wrapper}>
            <p>{calculatorFormStrings.itemTier}</p>
            <div
                id='itemTierSelector'
                className={styles.itemTierSelector}
                ref={tierSelectorRef}
                onClick={() => setIsItemTierSelectorShown(prevState => !prevState)}
            >
                <img
                    className={styles.backgroundSkeleton}
                    title={`${itemName?.[selectedLanguage]}${selectedItemTier}`}
                    src={selectorImg}
                    alt=""
                />
                {isItemTierSelectorShown &&
                    <img
                        src={arrowRight}
                        alt=''
                        style={{
                            width: '11px',
                            height: '50px',
                            marginTop: '6px',
                            marginLeft: '64px',
                            position: 'absolute'
                        }}
                    />}
                <div
                    className={isItemTierSelectorShown ? styles.itemTierButtonSelector : styles.itemTierButtonSelectorHidden}>
                    {['T4', 'T5', 'T6', 'T7', 'T8'].map(tier => {
                            let itemId: string;
                            if ((selectedItemType === 'BAG' && selectedItemBodyId !== 'INSIGHT') || selectedItemType === 'CAPE') {
                                itemId = selectedItemBodyId;
                            } else {
                                itemId = `${selectedItemType}_${selectedItemBodyId}`
                            }
                            return (
                                <span key={tier}>
                                    <img
                                        className={styles.backgroundSkeleton}
                                        title={tier}
                                        src={`${srcRoute}${tier}_${itemId}`}
                                        alt=''
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            selectItemTierHandler(tier as TTier);
                                            setIsItemTierSelectorShown(false);
                                        }}/>
                                 </span>
                            )
                        }
                    )}
                </div>
            </div>
        </div>
    )
}

export default ItemTierSelector;