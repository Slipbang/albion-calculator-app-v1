import {ISelectedWorkBenchItem} from "../../../../../store/GMProfit/gm-profit-slice";

interface IUseArtefactsProps {
    itemsQuantity: number;
    isArtefactPriceFetched: boolean;
    ownArtefactPrice: number;
    selectedWorkBenchItem:  ISelectedWorkBenchItem;
    fetchedArtefactPrice: number;
}

const useArtefacts = (props: IUseArtefactsProps) => {
    const {itemsQuantity, selectedWorkBenchItem, ownArtefactPrice, isArtefactPriceFetched, fetchedArtefactPrice,} = props;

    const {
        artefactItemId,
        artefactsQuantity,
    } = selectedWorkBenchItem;

    const totalArtefactPrice = !!artefactItemId ? (artefactsQuantity! * itemsQuantity * (isArtefactPriceFetched ? fetchedArtefactPrice : ownArtefactPrice)) : 0;


    return {
        totalArtefactPrice,
    }
}

export {useArtefacts}