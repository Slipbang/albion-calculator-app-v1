import {ICraftItem} from "../../../types/craftItemsType";

const defineMaterials = (selectedItem: ICraftItem) => {
    let mainMaterialQuantity: number;
    let subMaterialQuantity: number = 0;

    let mainMaterialId: string;
    let subMaterialId: string | undefined = undefined;

    const materialEntries = Object.entries(selectedItem).filter(item => item[0].toUpperCase() === item[0]);

    if (materialEntries.length < 2) {
        [mainMaterialId, mainMaterialQuantity] = materialEntries[0];
    } else {
        const [firstEntry, secondEntry] = materialEntries;

        if (firstEntry[1] > secondEntry[1]) {
            [mainMaterialId, mainMaterialQuantity] = firstEntry;
            [subMaterialId, subMaterialQuantity] = secondEntry;
        } else {
            [mainMaterialId, mainMaterialQuantity] = secondEntry;
            [subMaterialId, subMaterialQuantity] = firstEntry;
        }
    }

    return {
        mainMaterialQuantity,
        mainMaterialId,
        subMaterialQuantity,
        subMaterialId,
    }
}

export {defineMaterials};