export type TCities = 'Thetford' | 'Martlock' | 'Caerleon' | 'Bridgewatch' | 'Lymhurst' | 'Fort Sterling' | 'Brecilien' | 'Black Market';

export interface IItemsData {
    buyPriceMax: number;
    buyPriceMaxDate: string;
    itemId: string;
    location: TCities;
    quality: 1 | 2 | 3 | 4 | 5;
    sellPriceMin: number;
    sellPriceMinDate: string;
}