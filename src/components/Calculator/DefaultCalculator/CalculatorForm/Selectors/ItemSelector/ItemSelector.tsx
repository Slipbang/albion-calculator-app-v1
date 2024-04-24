import {interfaceSliceActions} from "../../../../../../store/interface/interface-slice";
import React, {useEffect, useRef} from "react";
import {useAppDispatch} from "../../../../../../store";
import {ISelectedLanguage, TSelectedLanguage} from "../../../../../../types/languageTypes";
import styles from './ItemSelector.module.scss';
import SelectedItemImage from "./SelectedItemImage/SelectedItemImage";
import ItemTypeSelector from "./ItemTypeSelector/ItemTypeSelector";
import {useSelector} from "react-redux";
import {selectItemSelectorVisibility} from "../../../../../../store/interface/interface-selector";


interface IItemSelectorProps {
    calculatorFormStrings: ISelectedLanguage['calculatorFormStrings'];
    selectedLanguage: TSelectedLanguage;
}

const ItemSelector = (props: IItemSelectorProps) => {
    const {selectedLanguage, calculatorFormStrings} = props;

    const isItemSelectorShown = useSelector(selectItemSelectorVisibility)
    const dispatchAction = useAppDispatch();

    const classSelectorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const clickOutsideTypeSelectorHandler = (event: MouseEvent) => {
            if (!event.composedPath().includes(classSelectorRef.current!)) {
                dispatchAction(interfaceSliceActions.toggleItemSelectorVisibility(false));
            }
        }

        document.body.addEventListener('click', clickOutsideTypeSelectorHandler);

        return () => {
            document.body.removeEventListener('click', clickOutsideTypeSelectorHandler);
        };
    }, []);

    return (
        <div className={styles.wrapper}>
            <p>{calculatorFormStrings.type}</p>
            <div
                className={styles.itemTypeSelector}
                ref={classSelectorRef}
                onClick={() => {
                    dispatchAction(interfaceSliceActions.toggleItemSelectorVisibility());
                    dispatchAction(interfaceSliceActions.toggleCraftTableVisibility(true));
                }}
            >
                <SelectedItemImage selectedLanguage={selectedLanguage}/>

                {isItemSelectorShown && <ItemTypeSelector />}
            </div>
        </div>
    )
}

export default ItemSelector;