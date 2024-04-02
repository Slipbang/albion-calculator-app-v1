import StyledBackpackCell from "../../BackpackSC/StyledBackpackCell";
import React from "react";
import styles from './BackpackCell.module.scss';

interface IBackpackCellProps {
    index: number,
    handleDragStart: (event: React.DragEvent<HTMLDivElement>, dragItemIndex: number) => void;
    handleDrag: (event: React.DragEvent<HTMLDivElement>) => void;
    onDrop: (event: React.DragEvent<HTMLDivElement>, dropItemIndex: number, isShiftPressed: boolean) => void;
    itemName?: {
        'ru': string,
        'en': string,
    }
    selectedLanguage: 'ru' | 'en';
    itemQuantity: number;
    itemImage: string;
}

const BackpackCell = React.memo((props: IBackpackCellProps) => {
    const {
        itemQuantity,
        itemName,
        itemImage,
        index,
        handleDragStart,
        handleDrag,
        onDrop,
        selectedLanguage
    } = props;

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
            <div className={styles.itemBox}>
                {!!itemImage && <img
                    title={itemName?.[selectedLanguage]}
                    src={itemImage}
                    alt=''
                />}
                {(itemQuantity! > 0) && <div className={styles.itemQuantity}>
                    <p>{itemQuantity!}</p>
                </div>}
            </div>
        </StyledBackpackCell>
    )
})

export default BackpackCell;