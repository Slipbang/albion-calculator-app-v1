export interface IFoodObject {
    itemId: string;
    foodConsumption: number;
    quantity: 1 | 10,
    [key: string]: number | string;
}

export type TFood = IFoodObject[]