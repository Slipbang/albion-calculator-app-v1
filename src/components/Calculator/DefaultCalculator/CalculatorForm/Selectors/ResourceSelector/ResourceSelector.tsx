import {arrowRight} from "../../../DefaultCalculatorImgReexports/DefaultCalculatorImgReexports";
import React, {useEffect, useRef, useState} from "react";
import {profitSliceActions} from "../../../../../../store/profit/profit-slice";
import {TCalcProps} from "../../../../../../types/calculatorPropsType";
import {useAppDispatch} from "../../../../../../store";
import {useSelector} from "react-redux";
import {selectDivFactor, selectResource} from "../../../../../../store/profit/profit-selectors";
import {ISelectedLanguage, TSelectedLanguage} from "../../../../../../types/languageTypes";
import styles from './ResourceSelector.module.scss';
import {ICraftItem, TTier} from "../../../../../../types/craftItemsType";
import {defineMaterials} from "../../../../Definers/defineMaterials";
import {srcRoute} from "../../../../../../store/api/api";
import {defineDivisionsFactors} from "../../../../Definers/defineDivisionsFactors";
import {
    selectInterfaceLanguageData,
    selectInterfaceMaterials
} from "../../../../../../store/interface/interface-selector";

interface IResourceSelectorProps {
    calculatorType: TCalcProps;
    calculatorFormStrings: ISelectedLanguage['calculatorFormStrings'];
    selectedLanguage: TSelectedLanguage;
}

const ResourceSelector = (props: IResourceSelectorProps) => {
    const {calculatorType, calculatorFormStrings, selectedLanguage} = props;

    const dispatchAction = useAppDispatch();

    const selectedResource = useSelector(selectResource);
    const materials = useSelector(selectInterfaceMaterials);
    const {resourceId} = selectedResource;
    const {RESOURCES: resourcesDivFactor} = useSelector(selectDivFactor);
    const {mainDivFactor, subDivFactor} = resourcesDivFactor;

    const languageData = useSelector(selectInterfaceLanguageData);
    const getResourceName = (itemId: string) => languageData?.[itemId]?.[selectedLanguage] || '';
    const resourceName = getResourceName(resourceId);

    const resourceSelectorRef = useRef<HTMLDivElement>(null);

    const [isResourceSelectorShown, setIsResourceSelectorShown] = useState(false);

    const selectResourceHandler = (selectedItem: ICraftItem) => {
        const {itemId} = selectedItem;
        const resourceTier = itemId!.split('_')[0] as TTier;
        const tierNumber = +resourceTier.split('T')[1];

        const {
            mainMaterialQuantity,
            subMaterialQuantity,
            mainMaterialId,
            subMaterialId
        } = defineMaterials(selectedItem);

        dispatchAction(profitSliceActions.setSelectedMaterials({
            calculatorType: calculatorType as Extract<TCalcProps, 'ITEMS' | 'RESOURCES'>,
            mainMaterialId: `${resourceTier}_${mainMaterialId}`,
            subMaterialId: `T${tierNumber - 1}_${subMaterialId}`,
        }));
        dispatchAction(profitSliceActions.setDivFactor({
            type: calculatorType as Extract<TCalcProps, 'ITEMS' | 'RESOURCES'>,
            divFactor: mainMaterialQuantity!,
            subDivFactor: subMaterialQuantity
        }));
        dispatchAction(profitSliceActions.setSelected({
            type: calculatorType,
            selectedResource: {
                resourceId: itemId!,
                resourceTier,
            },
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
                    title={resourceName}
                    src={`${srcRoute}${resourceId}`}
                    alt=""
                />
                <div className={styles.resourceDivFactor}>
                    <p>{mainDivFactor}/{subDivFactor}</p>
                </div>

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
                <div className={!!isResourceSelectorShown ? styles.resourceButtonSelector : styles.resourceButtonSelectorHidden}>

                    {materials.map((item) => {
                        const {itemId} = item;

                        const itemName = getResourceName(itemId!);

                        const {mainDiv, subDiv} = defineDivisionsFactors(item);

                        return (!itemId!.includes('T3')) && isMaterial(item) && (
                            <div className={styles.resourceUnit} key={itemId}>
                                <img
                                    className={styles.backgroundSkeleton}
                                    src={`${srcRoute}${itemId}`}
                                    alt=''
                                    title={itemName}
                                    onClick={(event) => {
                                        selectResourceHandler(item);
                                        setIsResourceSelectorShown(false);
                                        event.stopPropagation();
                                    }}
                                />
                                <div>
                                    <p>{mainDiv}/{subDiv}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ResourceSelector;