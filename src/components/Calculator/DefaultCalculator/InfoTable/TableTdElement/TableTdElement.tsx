import {CraftedItemInfoClass} from "../TableClasses/CraftedItemInfoClass";
import {ICraftConsumableInfoTuple, ICraftItemInfoTuple, infoCityOptions} from "../InfoTable";
import styles from "./TableTdElement.module.scss";
import React from "react";
import {TCalcProps} from "../../../../../types/calculatorPropsType";
import {CraftedConsumablesInfoClass} from "../TableClasses/CraftedConsumablesInfoClass";
import {IInfoTableData} from "../../../../../types/defaultCalculatorTypes";

interface ITableTdElementProps {
    enchantment: string;
    craftInfoParams: ICraftItemInfoTuple | ICraftConsumableInfoTuple;
    calculatorType: TCalcProps;
}

const TableTdElement = ({enchantment, craftInfoParams, calculatorType}: ITableTdElementProps) => {

    return (
        <>
            {infoCityOptions.map(city => {
                let itemData: IInfoTableData | undefined;
                if ('output' in craftInfoParams[0]!) {
                    ([itemData] = craftInfoParams as ICraftItemInfoTuple);
                }

                if (!!itemData?.resourceId && itemData?.resourceId?.includes?.('STONEBLOCK') && enchantment === '4') return;
                if (!!itemData?.resourceId && city === 'Black Market') return;
                if ((calculatorType === 'FOOD' || calculatorType === 'POTIONS') && city === 'Black Market') return;

                const cityInfo = (calculatorType === 'RESOURCES' || calculatorType === 'ITEMS')
                        ? new CraftedItemInfoClass(city, enchantment, ...craftInfoParams as ICraftItemInfoTuple)
                        : new CraftedConsumablesInfoClass(city, enchantment, ...craftInfoParams as ICraftConsumableInfoTuple);

                return (
                    <td
                        className={styles.tdElemStyles}
                        key={city}
                        data-tooltip-id="info-table-tooltip-data-html"
                        data-tooltip-html={cityInfo.title}
                        data-div-bg-color={typeof cityInfo.totalProfit === 'number' ? 'valid' : 'nonvalid'}
                    >
                        <div>{cityInfo.totalProfit.toLocaleString('en')}</div>
                        {typeof cityInfo.totalProfit === 'number' && (
                            <div>{cityInfo.profitPerItem.toLocaleString('en')}</div>
                        )}
                    </td>
                )
            })}
        </>
    )
}

export default TableTdElement;