import StyledDefaultButton from "../../../StyledComponentsCommon/StyledDefaultButton";
import {ITableData, profitSliceActions} from "../../../../../store/profit/profit-slice";
import {useSelector} from "react-redux";
import {selectCraftItemsList} from "../../../../../store/profit/profit-selectors";
import {ISelectedLanguage} from "../../../../../types/languageTypes";
import {TCalcProps} from "../../../../../types/calculatorPropsType";
import {useAppDispatch} from "../../../../../store";
import {interfaceSliceActions} from "../../../../../store/interface/interface-slice";
import {srcRoute} from "../../../../../store/api/api";
import styles from './TableStyles.module.scss';

interface TItemTableProps {
    craftTableStrings: ISelectedLanguage['craftTableStrings'];
    calculatorType: TCalcProps;
    deleteLiHandler: (type: string, id: string) => void;
}

const ItemTable = (props: TItemTableProps) => {
    const {
        craftTableStrings,
        calculatorType,
        deleteLiHandler,
    } = props;

    const dispatchAction = useAppDispatch();

    const craftItemsList = useSelector(selectCraftItemsList);

    const fetchItemDataHandler = (item: ITableData) => {
        let {itemId, mainMatsId, subMatsId, artefactId, journalId, emptyJournalId} = item!;
        let items = `${itemId},`;
        let subMats = !!subMatsId ? `${subMatsId},` : '';
        let mainMats = `${mainMatsId},`;
        let journals = `${journalId},${emptyJournalId},`;

        [1, 2, 3, 4].forEach(enchantmentLvl => {
            items += (enchantmentLvl !== 4) ? `${itemId}@${enchantmentLvl},` : `${itemId}@${enchantmentLvl}`;
            if (!!subMatsId) {
                subMats += `${subMatsId}_LEVEL${enchantmentLvl}@${enchantmentLvl},`;
            }

            mainMats += (enchantmentLvl !== 4) ? `${mainMatsId}_LEVEL${enchantmentLvl}@${enchantmentLvl},` : `${mainMatsId}_LEVEL${enchantmentLvl}@${enchantmentLvl}`;
        });

        const queryItemsParams = `${items}`;
        const queryMatsParams = `${subMats}${mainMats}`;
        const queryJournalsParams = `${journals}`;

        dispatchAction(profitSliceActions.setCraftedItem({...item, queryMatsParams, queryItemsParams, queryJournalsParams}));
        dispatchAction(interfaceSliceActions.setInfoTableVisibility(true));
    }

    return <div className={styles.tableStyle} data-notification={craftTableStrings.alert}>
        {craftItemsList.length > 0 &&
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
                {craftItemsList.map((item) => {
                    const {
                        itemId,
                        id,
                        mainResourceQuantity,
                        mainMatsId,
                        spentQuantityPerItem,
                        subResourceQuantity,
                        subMatsId,
                        percent,
                        output,
                        subDiv,
                        mainDiv
                    } = item;

                    return <tr key={id}>
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
                            {!!subMatsId &&
                                <img
                                    draggable={false}
                                    src={`${srcRoute}${subMatsId}`}
                                    alt={subMatsId}
                                    title={`${spentQuantityPerItem?.subMatsQuantity} ${craftTableStrings.unPerItem}`}
                                />}
                        </td>
                        <td>{percent}%</td>
                        <td>
                            {output}{craftTableStrings.metrics}
                            <img
                                src={`${srcRoute}${itemId}`}
                                alt={itemId}
                                title={!!subDiv ? `${mainDiv}/${subDiv}` : `${mainDiv}`}
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
                })}
                </tbody>
            </table>
        }
    </div>
}

export default ItemTable;