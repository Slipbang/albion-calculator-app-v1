import {ISelectedWorkBenchItem} from "../../../../../store/GMProfit/gm-profit-slice";

interface IUseJournalsProps{
    isJournalUsed: boolean;
    enchantmentNum: string;
    itemsQuantity: number;
    selectedWorkBenchItem:  ISelectedWorkBenchItem;
}

const useJournals = (props: IUseJournalsProps) => {
    const {
        isJournalUsed,
        enchantmentNum,
        itemsQuantity,
        selectedWorkBenchItem,
    } = props;

    const {itemTier, itemClass, journalQuantity} = selectedWorkBenchItem;

    const totalJournalQuantity = isJournalUsed ? ((journalQuantity! *  Math.pow(2, +enchantmentNum)) * itemsQuantity) : 0;

    const journalItem = () => {
        let journalId: string = '';
        let journalApiId: string = '';

        switch (itemClass){
            case 'warrior':
                journalId = 'JOURNAL_WARRIOR';
                break;
            case 'hunter':
                journalId = 'JOURNAL_HUNTER';
                break;
            case 'mage':
                journalId = 'JOURNAL_MAGE';
                break;
            case 'toolmaker':
                journalId = 'JOURNAL_TOOLMAKER';
        }
        journalApiId = `T${itemTier}_${journalId}`;
        const emptyJournalId = `${journalApiId}_EMPTY`;

        const emptyJournalImage = `https://render.albiononline.com/v1/item/${emptyJournalId}`;

        return {emptyJournalImage, journalApiId, emptyJournalId};
    }

    const {emptyJournalImage, journalApiId, emptyJournalId} = journalItem();

    return {
        emptyJournalImage,
        emptyJournalId,
        journalApiId,
        totalJournalQuantity,
    }
}

export {useJournals};