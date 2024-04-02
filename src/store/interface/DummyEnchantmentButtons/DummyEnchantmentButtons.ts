import {
    activeEnchantmentButton1,
    activeEnchantmentButton2,
    activeEnchantmentButton3,
    activeEnchantmentButton4,
    hoveredActiveEnchantmentButton1,
    hoveredActiveEnchantmentButton2,
    hoveredActiveEnchantmentButton3,
    hoveredActiveEnchantmentButton4,
    hoveredEnchantmentButton1,
    hoveredEnchantmentButton2,
    hoveredEnchantmentButton3,
    hoveredEnchantmentButton4,
    nonActiveEnchantmentButton1,
    nonActiveEnchantmentButton2,
    nonActiveEnchantmentButton3,
    nonActiveEnchantmentButton4
} from "../../../components/Calculator/GameModeCalculator/GMCraftingForm/CraftingFormImgReexports/CraftingFormImgReexports";

export interface IEnchantmentButton {
    button: string;
    activeButton: string;
    hoveredButton: string;
    hoveredActiveButton: string;
    active: boolean;
    index: number;
}

export const dummyEnchantmentButtons: IEnchantmentButton[] = [
    {
        button: nonActiveEnchantmentButton1,
        activeButton: activeEnchantmentButton1,
        hoveredButton: hoveredEnchantmentButton1,
        hoveredActiveButton: hoveredActiveEnchantmentButton1,
        active: false,
        index: 0,
    },
    {
        button: nonActiveEnchantmentButton2,
        activeButton: activeEnchantmentButton2,
        hoveredButton: hoveredEnchantmentButton2,
        hoveredActiveButton: hoveredActiveEnchantmentButton2,
        active: false,
        index: 1,
    },
    {
        button: nonActiveEnchantmentButton3,
        activeButton: activeEnchantmentButton3,
        hoveredButton: hoveredEnchantmentButton3,
        hoveredActiveButton: hoveredActiveEnchantmentButton3,
        active: false,
        index: 2,
    },
    {
        button: nonActiveEnchantmentButton4,
        activeButton: activeEnchantmentButton4,
        hoveredButton: hoveredEnchantmentButton4,
        hoveredActiveButton: hoveredActiveEnchantmentButton4,
        active: false,
        index: 3,
    }
];