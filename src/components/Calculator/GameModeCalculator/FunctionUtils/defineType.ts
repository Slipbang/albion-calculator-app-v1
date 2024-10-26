import {TItemNode} from "../../../../types/craftItemsType";

const isTypeResource = (itemNode: TItemNode) => {
    switch (itemNode) {
        case 'METALBAR':
        case 'CLOTH':
        case 'PLANKS':
        case 'LEATHER':
        case 'STONEBLOCK':
        case 'ORE':
        case 'HIDE':
        case 'FIBER':
        case 'ROCK':
        case 'WOOD':
        case 'stonehammer':
        case 'skinningknife':
        case 'sickle':
        case 'pickaxe':
        case 'demolitionhammer':
        case 'fishing':
        case 'woodaxe':
        case '':
            return true;
        default:
            return false;
    }
}

export {isTypeResource};