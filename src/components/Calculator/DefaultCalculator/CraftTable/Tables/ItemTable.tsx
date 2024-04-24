import StyledDefaultButton from "../../../StyledComponentsCommon/StyledDefaultButton";
import {profitSliceActions} from "../../../../../store/profit/profit-slice";
import {useSelector} from "react-redux";
import {selectCraftList, selectSimilarTypeErrors} from "../../../../../store/profit/profit-selectors";
import {TCalcProps} from "../../../../../types/calculatorPropsType";
import {useAppDispatch} from "../../../../../store";
import {interfaceSliceActions} from "../../../../../store/interface/interface-slice";
import {srcRoute} from "../../../../../store/api/api";
import styles from './TableStyles.module.scss';
import {ITableData} from "../../../../../types/defaultCalculatorTypes";
import {ISelectedLanguage} from "../../../../../types/languageTypes";

interface TItemTableProps {
    craftTableStrings: ISelectedLanguage['craftTableStrings']
    calculatorType: TCalcProps;
    deleteLiHandler: (type: TCalcProps, id: string) => void;
}

const ItemTable = (props: TItemTableProps) => {
    const {
        craftTableStrings,
        calculatorType,
        deleteLiHandler,
    } = props;

    const dispatchAction = useAppDispatch();

    const craftLists = useSelector(selectCraftList);
    const {ITEMS: similarItemId} = useSelector(selectSimilarTypeErrors);

    const fetchItemDataHandler = (item: ITableData) => {
        const {itemId, mainMatsId, subMatsId, journalId, emptyJournalId} = item.infoTableData;

        const items = [itemId];
        const materials = [mainMatsId];
        if (!!subMatsId) materials.push(subMatsId);
        const journals = `${journalId},${emptyJournalId}`;

        [1, 2, 3, 4].forEach(enchantmentLvl => {
            items.push(`${itemId}@${enchantmentLvl}`);
            if (!!subMatsId) materials.push(`${subMatsId}_LEVEL${enchantmentLvl}@${enchantmentLvl}`);
            materials.push(`${mainMatsId}_LEVEL${enchantmentLvl}@${enchantmentLvl}`);
        });

        const queryItemsParams = items.join(',');
        const queryMatsParams = materials.join(',');
        const queryJournalsParams = journals;

        dispatchAction(profitSliceActions.setCraftedItem({
            ...item,
            tableQueryParams: {
                queryMatsParams,
                queryItemsParams,
                queryJournalsParams
            }
        }));
        dispatchAction(interfaceSliceActions.setInfoTableVisibility(true));
    }

    return <div className={styles.tableStyle} data-notification={craftTableStrings.alert}>
        {craftLists[calculatorType].length > 0 && (
            <table>
                <thead>
                <tr>
                    <th>{craftTableStrings.materialQuant}</th>
                    <th>{craftTableStrings.subMatsQuant}</th>
                    <th>{craftTableStrings.returnPercentage}</th>
                    <th>{craftTableStrings.itemsOutput}</th>
                    <th>{craftTableStrings.deleteButton}</th>
                </tr>
                </thead>
                <tbody>
                {(craftLists[calculatorType] as ITableData[]).map((item) => {
                    const {id, mainResourceQuantity, subResourceQuantity, percent} = item.craftTableData;
                    const {itemId, mainMatsId, spentQuantityPerItem, subMatsId, output} = item.infoTableData;

                    return (
                        <tr key={id} data-similar-allert={id === similarItemId ? 'similar' : 'non-similar'}>
                            <td>
                                {mainResourceQuantity}{craftTableStrings.metrics}
                                <img
                                    src={`${srcRoute}${mainMatsId}`}
                                    alt={mainMatsId}
                                    title={`${spentQuantityPerItem?.mainMatsQuantity} ${craftTableStrings.unPerItem}`}
                                />
                            </td>
                            <td>
                                {subResourceQuantity}{craftTableStrings.metrics}
                                {!!subMatsId && (
                                    <img
                                        draggable={false}
                                        src={`${srcRoute}${subMatsId}`}
                                        alt={subMatsId}
                                        title={`${spentQuantityPerItem?.subMatsQuantity} ${craftTableStrings.unPerItem}`}
                                    />
                                )}
                            </td>
                            <td>{percent}%</td>
                            <td>
                                {output}{craftTableStrings.metrics}
                                <img
                                    src={`${srcRoute}${itemId}`}
                                    alt={itemId}
                                />
                            </td>
                            <td>
                                <StyledDefaultButton
                                    $width={70}
                                    $height={23}
                                    onClick={() => deleteLiHandler(calculatorType, id)}
                                >Delete</StyledDefaultButton>

                                <StyledDefaultButton
                                    $width={70}
                                    $height={23}
                                    onClick={() => fetchItemDataHandler(item)}
                                >Info</StyledDefaultButton>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        )}
    </div>
}

export default ItemTable;