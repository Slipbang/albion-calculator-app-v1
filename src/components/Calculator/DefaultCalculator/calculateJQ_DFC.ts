import {TCraftObjectTypes} from "../../../types/craftItemsType";

const calculateJQ_DFC = (itemType: TCraftObjectTypes, selectedItemTier: string) => {
    let journalsQuantity = 0;
    const itemTier = +selectedItemTier.split('T')[1];
    let defaultFoodConsumption = 0;

    switch (itemType) {
        case '2H': {
            defaultFoodConsumption = 57.6;
            switch (itemTier) {
                case 4:
                case 5:
                case 6:
                    journalsQuantity = 0.2 * (itemTier - 3);
                    break;
                case 7:
                    journalsQuantity = 0.73;
                    break;
                case 8:
                    journalsQuantity = 0.76;
            }
        }
            break;
        case 'MAIN': {
            defaultFoodConsumption = 43.2;
            switch (itemTier) {
                case 4:
                case 5:
                case 6:
                    journalsQuantity = 0.15 * (itemTier - 3);
                    break;
                case 7:
                    journalsQuantity = 0.55;
                    break;
                case 8:
                    journalsQuantity = 0.57;
            }
        }
            break;
        case 'ARMOR':
        case 'BAG': {
            defaultFoodConsumption = 28.8;
            switch (itemTier) {
                case 4:
                case 5:
                case 6:
                    journalsQuantity = 0.1 * (itemTier - 3);
                    break;
                case 7:
                    journalsQuantity = 0.36;
                    break;
                case 8:
                    journalsQuantity = 0.38;
            }
        }
            break;
        case 'HEAD':
        case 'SHOES':
        case 'OFF':
        case 'CAPE': {
            defaultFoodConsumption = 14.4;
            switch (itemTier) {
                case 4:
                case 5:
                case 6:
                    journalsQuantity = 0.05 * (itemTier - 3);
                    break;
                case 7:
                    journalsQuantity = 0.18;
                    break;
                case 8:
                    journalsQuantity = 0.19;
            }
        }
            break;
    }


    return {journalsQuantity, defaultFoodConsumption}
}

export {calculateJQ_DFC}