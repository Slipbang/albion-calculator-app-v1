export interface IConsumableObject {
    itemId: string;
    foodConsumption: number;
    amountCrafted: 1 | 5 | 10;
    [key: string]: number | string;
}

export type TConsumable = IConsumableObject[]