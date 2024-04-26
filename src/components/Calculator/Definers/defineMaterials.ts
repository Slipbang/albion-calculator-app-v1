import {ICraftItem} from "../../../types/craftItemsType";

const defineMaterials = (selectedItem: ICraftItem) => {
    let mainMaterialQuantity: number = 0;
    let subMaterialQuantity: number = 0;

    let mainMaterialId: string | '' = '';
    let subMaterialId: string | '' = '';

    const materialEntries = Object.entries(selectedItem).filter(item => item[0].toUpperCase() === item[0]);

    materialEntries.some((entry, index) => {
        if (materialEntries.length < 2) {
            [mainMaterialId, mainMaterialQuantity] = entry;
        } else {
            if (materialEntries[index][1] >= materialEntries[index + 1][1]) {
                [mainMaterialId, mainMaterialQuantity] = materialEntries[index];
                [subMaterialId, subMaterialQuantity] = materialEntries[index + 1];

                return true;
            } else {
                [mainMaterialId, mainMaterialQuantity] = materialEntries[index + 1];
                [subMaterialId, subMaterialQuantity] = materialEntries[index];

                return true;
            }
        }
    })

    return {
        mainMaterialQuantity,
        mainMaterialId,
        subMaterialQuantity,
        subMaterialId,
    }
}

export {defineMaterials};