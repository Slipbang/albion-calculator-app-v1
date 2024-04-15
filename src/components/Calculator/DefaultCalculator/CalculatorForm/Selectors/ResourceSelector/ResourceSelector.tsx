import {arrowRight} from "../../../DefaultCalculatorImgReexports/DefaultCalculatorImgReexports";
import {materials} from "../../../../../../store/Items/materials";
import React, {useEffect, useRef, useState} from "react";
import {profitSliceActions} from "../../../../../../store/profit/profit-slice";
import {TCalcProps} from "../../../../../../types/calculatorPropsType";
import {useAppDispatch} from "../../../../../../store";
import {useSelector} from "react-redux";
import {selectResource} from "../../../../../../store/profit/profit-selectors";
import {ISelectedLanguage} from "../../../../../../types/languageTypes";
import styles from './ResourceSelector.module.scss';
import {ICraftItem, TTier} from "../../../../../../types/craftItemsType";
import {defineMaterials} from "../../../../Definers/defineMaterials";
import {srcRoute} from "../../../../../../store/api/api";

interface IResourceSelectorProps {
    calculatorType: TCalcProps;
    calculatorFormStrings: ISelectedLanguage['calculatorFormStrings'];
    selectedLanguage: 'ru' | 'en';
}

const ResourceSelector = (props: IResourceSelectorProps) => {
    const {calculatorType, calculatorFormStrings, selectedLanguage} = props;

    const dispatchAction = useAppDispatch();

    const selectedResource = useSelector(selectResource);
    const {resourceId, resourceName, resourceTier} = selectedResource;

    const resourceSelectorRef = useRef<HTMLDivElement>(null);

    const [isResourceSelectorShown, setIsResourceSelectorShown] = useState(false);

    const selectResourceHandler = (selectedItem: ICraftItem) => {
        const {itemId, itemName} = selectedItem;
        const resourceTier = itemId!.split('_')[0] as TTier;
        const tierNumber = +resourceTier.split('T')[1];

        const {
            mainMaterialQuantity,
            subMaterialQuantity,
            mainMaterialId,
            subMaterialId
        } = defineMaterials(selectedItem);

        dispatchAction(profitSliceActions.setSelectedMaterials({
            type: calculatorType,
            mainMaterialId: `${resourceTier}_${mainMaterialId}`,
            subMaterialId: `T${tierNumber - 1}_${subMaterialId}`,
        }));
        dispatchAction(profitSliceActions.setDivFactor({
            type: calculatorType,
            divFactor: mainMaterialQuantity!,
            subDivFactor: subMaterialQuantity
        }));
        dispatchAction(profitSliceActions.setSelected({
            type: calculatorType,
            selectedResourceId: itemId!,
            resourceTier,
            itemName: itemName!,
        }));
    }

    useEffect(() => {
        const clickOutResourceSelectorHandler = (event: MouseEvent) => {
            if (!event.composedPath().includes(resourceSelectorRef.current!)) {
                setIsResourceSelectorShown(false);
            }
        }

        document.body.addEventListener('click', clickOutResourceSelectorHandler);

        return () => {
            document.body.removeEventListener('click', clickOutResourceSelectorHandler);
        };
    }, []);

    const isMaterial = (item: ICraftItem) => {
        return 'METALBAR' in item || 'LEATHER' in item || 'CLOTH' in item || 'PLANKS' in item || 'STONEBLOCK' in item;
    }

    return (
        <div className={styles.wrapper}>
            <p>{calculatorFormStrings.type}</p>
            <div className={styles.resourceSelector}
                 ref={resourceSelectorRef}
                 onClick={() => setIsResourceSelectorShown(prevState => !prevState)}
            >
                <img
                    className={styles.backgroundSkeleton}
                    title={`${resourceName?.[selectedLanguage]!} ${resourceTier}`}
                    src={`${srcRoute}${resourceId}`}
                    alt=""
                />
                {isResourceSelectorShown && <img
                    src={arrowRight}
                    alt=""
                    style={{
                        width: '11px',
                        height: '50px',
                        marginTop: '6px',
                        marginLeft: '64px',
                        position: 'absolute'
                    }}
                />}
                <div
                    className={!!isResourceSelectorShown ? styles.resourceButtonSelector : styles.resourceButtonSelectorHidden}>

                    {materials.map((item) => {
                        const {itemId, itemName} = item;
                        const itemTier = itemId!.split('_')[0];

                        return (!itemId!.includes('T3')) && isMaterial(item) &&
                            <img
                                className={styles.backgroundSkeleton}
                                src={`${srcRoute}${itemId}`}
                                alt=''
                                title={`${itemName?.[selectedLanguage]} ${itemTier}`}
                                key={itemId}
                                onClick={(event) => {
                                    selectResourceHandler(item);
                                    setIsResourceSelectorShown(false);
                                    event.stopPropagation();
                                }}
                            />
                    })}
                </div>
            </div>
        </div>
    )
}

export default ResourceSelector;