import StyledDefaultButton from "../../../StyledComponentsCommon/StyledDefaultButton";
import {useSelector} from "react-redux";
import {selectCraftList, selectSimilarTypeErrors} from "../../../../../store/profit/profit-selectors";
import {ISelectedLanguage} from "../../../../../types/languageTypes";
import {TCalcProps} from "../../../../../types/calculatorPropsType";
import {ITableData, profitSliceActions} from "../../../../../store/profit/profit-slice";
import {interfaceSliceActions} from "../../../../../store/interface/interface-slice";
import {useAppDispatch} from "../../../../../store";
import {srcRoute} from "../../../../../store/api/api";
import styles from './TableStyles.module.scss';

interface IResourceTableProps {
    deleteLiHandler: (type: TCalcProps, id: string) => void;
    craftTableStrings: ISelectedLanguage['craftTableStrings'];
    calculatorType: TCalcProps;
}

const ResourceTable = (props: IResourceTableProps) => {
    const {
        craftTableStrings,
        calculatorType,
        deleteLiHandler
    } = props;
    const dispatchAction = useAppDispatch();
    const craftLists = useSelector(selectCraftList);
    const {RESOURCES: similarResourceId} = useSelector(selectSimilarTypeErrors);

    const fetchResourceDataHandler = (item: ITableData) => {
        let {resourceId, mainMatsId, subMatsId} = item.infoTableData;
        let craftedMaterial = `${resourceId},`;
        let subMats = `${subMatsId},`;
        let mainMats = `${mainMatsId},`;

        [1,2,3,4].forEach(enchantmentLvl => {
            craftedMaterial += !resourceId!.includes('STONEBLOCK') ? `${resourceId}_LEVEL${enchantmentLvl}@${enchantmentLvl},` : '';
            subMats += !subMats.includes('STONEBLOCK') ? `${subMatsId}_LEVEL${enchantmentLvl}@${enchantmentLvl},` : '';
            mainMats += `${mainMatsId}_LEVEL${enchantmentLvl}@${enchantmentLvl}${(enchantmentLvl === 4) ? '' : ','}`;
        });

        const queryMatsParams = `${craftedMaterial}${subMats}${mainMats}`;

        dispatchAction(profitSliceActions.setCraftedItem({
            ...item,
            tableQueryParams: {
                queryMatsParams,
            }
        }));
        dispatchAction(interfaceSliceActions.setInfoTableVisibility(true));
    }

    return <div className={styles.tableStyle} data-notification={craftTableStrings.alert}>
        {craftLists[calculatorType].length > 0 && <table>
            <thead>
            <tr>
                <th>{craftTableStrings.materialTier}</th>
                <th>{craftTableStrings.resQuant}</th>
                <th>{craftTableStrings.subMatsQuant}</th>
                <th>{craftTableStrings.returnPercentage}</th>
                <th>{craftTableStrings.materialsOutput}</th>
                <th>{craftTableStrings.deleteButton}</th>
            </tr>
            </thead>

            <tbody>
            {(craftLists[calculatorType] as ITableData[]).map((item) => {
                const {id, mainResourceQuantity, subResourceQuantity, percent} = item.craftTableData;
                const {resourceId, spentQuantityPerItem, output} = item.infoTableData;

                return (
                    <tr key={id} data-similar-allert={id === similarResourceId ? 'similar' : 'non-similar'}>
                        <td>
                            <img
                                draggable={false}
                                src={`${srcRoute}${resourceId}`}
                                alt={resourceId}
                                title={spentQuantityPerItem?.mainMatsQuantity.toString()}
                            />
                        </td>
                        <td>{mainResourceQuantity}{craftTableStrings.metrics}</td>
                        <td>{subResourceQuantity}{craftTableStrings.metrics}</td>
                        <td>{percent}%</td>
                        <td>{output}{craftTableStrings.metrics}</td>
                        <td>
                            <StyledDefaultButton
                                $width={70}
                                $height={23}
                                onClick={() => deleteLiHandler(calculatorType, id)}
                            >delete</StyledDefaultButton>

                            <StyledDefaultButton
                                $width={70}
                                $height={23}
                                onClick={() => fetchResourceDataHandler(item)}
                            >Info</StyledDefaultButton>
                        </td>
                    </tr>
                )
            }
            )}
            </tbody>
        </table>}
    </div>
}

export default ResourceTable;