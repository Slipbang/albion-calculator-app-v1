import StyledThumb from "../../../StyledComponentsCommon/StyledThumb";
import React, {useCallback, useState} from "react";
import {useAppDispatch} from "../../../../../store";
import {useSelector} from "react-redux";
import {selectBackpackItems} from "../../../../../store/GMProfit/gm-profit-selectors";
import {GMProfitSliceActions} from "../../../../../store/GMProfit/gm-profit-slice";
import styles from './BackpackItems.module.scss';
import {selectLanguage} from "../../../../../store/language/language-selector";
import BackpackCell from "./BackpackCell/BackpackCell";

const BackpackItems = () => {

    const dispatchAction = useAppDispatch();

    const backpackItems = useSelector(selectBackpackItems);
    const {selectedLanguage} = useSelector(selectLanguage);

    const [touchedItemIndex, setTouchedItemIndex] = useState<number | null>(null);

    const handleDragStart = useCallback((event: React.DragEvent<HTMLDivElement>, dragItemIndex: number) => {
        setTouchedItemIndex(dragItemIndex);
    }, []);

    const handleDrag = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }, [setTouchedItemIndex]);

    const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>, dropItemIndex: number, isShiftPressed: boolean) => {
        event.preventDefault();

        dispatchAction(GMProfitSliceActions.swapItems({
            dragItemIndex: touchedItemIndex!,
            dropItemIndex: dropItemIndex,
            isShiftPressed
        }));
    }, [touchedItemIndex])

    return <StyledThumb>
        <div className={styles.wrapper}>
            {backpackItems.map((item, index) => {
                const {itemQuantity, itemImage, itemName} = item;

                return (
                    <BackpackCell
                        itemName={itemName!}
                        key={index}
                        itemQuantity={itemQuantity!}
                        itemImage={itemImage}
                        selectedLanguage={selectedLanguage}
                        index={index}
                        handleDragStart={handleDragStart}
                        handleDrag={handleDrag}
                        onDrop={onDrop}
                    />
                )
            })}
        </div>
    </StyledThumb>
}

export default BackpackItems;