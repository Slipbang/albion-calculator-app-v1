import StyledBackpackCell from "../../BackpackSC/StyledBackpackCell";
import React from "react";
import styles from './BackpackCell.module.scss';
import {TSelectedLanguage} from "../../../../../../types/languageTypes";
import {TItemName} from "../../../../../../types/craftItemsType";
import {IBagCell} from "../../../../../../store/Items/workBenchSelectorItems_marketItems";
import {ITooltipData} from "../BackpackItems";

interface IBackpackCellProps {
    index: number;
    item: IBagCell;
    handleDragStart: (event: React.DragEvent<HTMLDivElement>, dragItemIndex: number) => void;
    handleDrag: (event: React.DragEvent<HTMLDivElement>) => void;
    onDrop: (event: React.DragEvent<HTMLDivElement>, dropItemIndex: number, isShiftPressed: boolean) => void;
    selectedLanguage: TSelectedLanguage;
    setTooltipData: React.Dispatch<React.SetStateAction<ITooltipData>>;
}

const BackpackCell = React.memo((props: IBackpackCellProps) => {
    const {
        item,
        index,
        handleDragStart,
        handleDrag,
        onDrop,
        selectedLanguage,
        setTooltipData,
    } = props;

    const {itemQuantity, itemName, itemImage, itemId} = item;

    return (
        <StyledBackpackCell
            draggable={false}
            onDragStart={(event) => {
                handleDragStart(event, index);
            }}
            onDragOver={(event) => {
                handleDrag(event);
            }}
            onDrop={(event) => {
                onDrop(event, index, !!event.shiftKey);
            }}
        >
            {!!itemId && (
                <div
                    className={styles.itemBox}
                    data-tooltip-id="backpack-item-tooltip-data-html"
                    onMouseEnter={() => setTooltipData({item, index})}
                >
                    <img
                        // title={itemName?.[selectedLanguage]}
                        src={itemImage}
                        alt=''
                    />
                    {(itemQuantity! > 0) && <div className={styles.itemQuantity}>
                        <p>{itemQuantity!}</p>
                    </div>}
                </div>
            )}
        </StyledBackpackCell>
    )
})

export default BackpackCell;