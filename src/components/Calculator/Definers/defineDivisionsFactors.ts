import {ICraftItem} from "../../../types/craftItemsType";

const defineDivisionsFactors = (item: ICraftItem) => {
    const bufferedObject: {[key: string]: number} = {}
    for (const key in item){
        if (key.toUpperCase() === key && !!item[key as keyof ICraftItem]){
            bufferedObject[key] = +item[key as keyof ICraftItem]!;
        }
    }

    const values = Object.values(bufferedObject);
    const [mainDiv,subDiv] = [Math.max(...values), values.length > 1 ? Math.min(...values) : 0];

    return {mainDiv, subDiv}
}

export {defineDivisionsFactors};