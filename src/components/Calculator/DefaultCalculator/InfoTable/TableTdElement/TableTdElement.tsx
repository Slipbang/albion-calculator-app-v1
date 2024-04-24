import {CraftedItemInfoClass} from "../TableClasses/CraftedItemInfoClass";
import {ICraftConsumableInfoTuple, ICraftItemInfoTuple, infoCityOptions} from "../InfoTable";
import styles from "./TableTdElement.module.scss";
import {TCities} from "../../../../../types/InfoTableTypes";
import React from "react";
import {TCalcProps} from "../../../../../types/calculatorPropsType";
import {CraftedConsumablesInfoClass} from "../TableClasses/CraftedConsumablesInfoClass";
import {IInfoTableData} from "../../../../../store/profit/profit-slice";


interface infoCities {
    CaerleonInfo: CraftedItemInfoClass | CraftedConsumablesInfoClass | undefined,
    FortSterlingInfo: CraftedItemInfoClass | CraftedConsumablesInfoClass |undefined,
    BridgewatchInfo: CraftedItemInfoClass | CraftedConsumablesInfoClass |undefined,
    MartlockInfo: CraftedItemInfoClass | CraftedConsumablesInfoClass |undefined,
    ThetfordInfo: CraftedItemInfoClass | CraftedConsumablesInfoClass |undefined,
    LymhurstInfo: CraftedItemInfoClass | CraftedConsumablesInfoClass |undefined,
    BrecilienInfo: CraftedItemInfoClass | CraftedConsumablesInfoClass |undefined,
    BlackMarketInfo: CraftedItemInfoClass | CraftedConsumablesInfoClass |undefined,
}

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
                if('output' in craftInfoParams[0]!){
                    ([itemData] = craftInfoParams as ICraftItemInfoTuple);
                }

                if (!!itemData?.resourceId && itemData?.resourceId?.includes?.('STONEBLOCK') && enchantment === '4') return;
                if (!!itemData?.resourceId && city === 'Black Market') return;
                if ((calculatorType === 'FOOD' || calculatorType === 'POTIONS') && city === 'Black Market') return;

                const infoClasses: infoCities = {
                    CaerleonInfo: undefined,
                    FortSterlingInfo: undefined,
                    BridgewatchInfo: undefined,
                    MartlockInfo: undefined,
                    ThetfordInfo: undefined,
                    LymhurstInfo: undefined,
                    BrecilienInfo: undefined,
                    BlackMarketInfo: undefined,
                };

                const cityKey = city.split(' ').join('') as keyof infoCities;

                infoClasses[`${cityKey}Info` as keyof infoCities] =
                    (calculatorType === 'RESOURCES' || calculatorType === 'ITEMS')
                        ? new CraftedItemInfoClass(city, enchantment, ...craftInfoParams as ICraftItemInfoTuple)
                        : new CraftedConsumablesInfoClass(city, enchantment, ...craftInfoParams as ICraftConsumableInfoTuple);

                return (
                    <td
                        className={styles.tdElemStyles}
                        key={cityKey}
                        data-tooltip-id="info-table-tooltip-data-html"
                        data-tooltip-html={infoClasses[`${cityKey}Info` as keyof infoCities]!.title}
                        data-div-bg-color={typeof infoClasses[`${cityKey}Info` as keyof infoCities]?.totalProfit === 'number' ? 'valid' : 'nonvalid'}
                    >
                        <div>{infoClasses[`${cityKey}Info` as keyof infoCities]!.totalProfit.toLocaleString('en')}</div>
                        {typeof infoClasses[`${cityKey}Info` as keyof infoCities]?.totalProfit === 'number' && <div>{infoClasses[`${cityKey}Info` as keyof infoCities]!.profitPerItem.toLocaleString('en')}</div>}
                    </td>
                )
            })}
        </>
    )
}

export default TableTdElement;