export interface TransportationData {
    from: AODItemData,
    to: AODItemData,
}

export interface AODItemData {
    itemId: string
    location: string
    averageItems: number
    averagePrice: number
    buyPriceMax: number
    buyPriceMaxDate: string
    date: string
    marketFee: number
    normalizedPrice: number
    quality: number
    sellPriceMin: number
    sellPriceMinDate: string
}

export type TTransportationItemTypes = '2H' | 'MAIN' | 'BAG' | 'CAPE'
    | 'CAPEITEM' | 'ARMOR' | 'HEAD' | 'SHOES' | 'OFF' | 'LEATHER'
    | 'CLOTH' | 'METALBAR' | 'PLANKS' | 'STONEBLOCK' | 'FIBER'
    | 'HIDE' | 'ORE' | 'ROCK' | 'WOOD' | 'JOURNAL' | 'BACKPACK'
    | 'SKILLBOOK' | 'FACTION' | 'RUNE' | 'SOUL' | 'RELIC' | 'SHARD';


export interface IItemType {
    itemId: string;
    itemName: {
        ru: string,
        en: string,
    }
}

export type TTransportationItemsInfo = {
    [key in TTransportationItemTypes]: IItemType[]
}