import {ICraftItem, TResourceType} from "../../../types/craftItemsType";

type TMatsKeys = keyof ICraftItem;

const defineMaterials = (selectedItem: ICraftItem) => {
    let cachedQuant: number = 0;
    let cachedMatId: TResourceType | '' = '';

    let mainMaterialQuantity: number = 0;
    let subMaterialQuantity: number = 0;

    let mainMaterialId: TResourceType | '' = '';
    let subMaterialId: TResourceType | '' = '';

    let matsKeys: TMatsKeys[] = [];

    let itemKeys = Object.keys(selectedItem) as TMatsKeys[];

    itemKeys.forEach(key => {
        if (key === key.toUpperCase()){
            matsKeys.push(key)
        }
    })

    matsKeys.forEach(key => {
        if (typeof selectedItem[key] === 'number' && selectedItem[key]! > 0) {
            subMaterialQuantity = selectedItem[key] as number;
            subMaterialId = key as TResourceType;

            if (mainMaterialQuantity > selectedItem[key]!) {
                return;
            }

            if (mainMaterialQuantity < selectedItem[key]!) {
                cachedQuant = mainMaterialQuantity;
                cachedMatId = mainMaterialId;

                mainMaterialQuantity = subMaterialQuantity;
                mainMaterialId = subMaterialId;

                subMaterialQuantity = cachedQuant;
                subMaterialId = cachedMatId;

                return;
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