import {useState} from "react";

import {ISelectedWorkBenchItem} from "../../../../store/GMProfit/gm-profit-slice";
import StyledCraftingForm from "./GMCraftingFormSC/StyledCraftingForm";

import CraftingButton from "./CraftingButton/CraftingButton";
import ArtefactsBox from "./ArtefactsBox/ArtefactsBox";
import TotalFoodTaxBox from "./TotalFoodTaxBox/TotalFoodTaxBox";
import MainItemImageBox from "./MainItemImageBox/MainItemImageBox";
import ItemsQuantityBox from "./ItemsQuantityBox/ItemsQuantityBox";
import React from "react";
import {useSelector} from "react-redux";
import {selectCalculatorType} from "../../../../store/interface/interface-selector";
import CalculatorForm from "./CalculatorForm/CalculatorForm";
import JournalsBox from "./JournalsBox/JournalsBox";
import CloseButton from "./CloseButton/CloseButton";

type TSelectedWorkBenchItemKeys =  keyof ISelectedWorkBenchItem;

export type TExtractedMaterialsKeys = Extract<TSelectedWorkBenchItemKeys, 'PLANKS' | 'METALBAR' | 'CLOTH' | 'LEATHER' | 'STONEBLOCK' | 'WOOD' | 'ORE' | 'ROCK' | 'FIBER' | 'HIDE'>;

const GMCraftingForm = () => {
    const calculatorType = useSelector(selectCalculatorType);

    const [position, setPosition] = useState<{ x: number | string, y: number | string }>({x: '50%', y: '50%'});

    const dummyImg = new Image();

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setDragImage(dummyImg, 0, 0);
    };

    const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
        event.stopPropagation();
        const {clientX, clientY} = event;
        setPosition({x: clientX, y: clientY})
    };

    return (
        <StyledCraftingForm
            style={{
                position: "absolute",
                top: position.y,
                left: position.x,
            }}
            draggable={true}
            onDragStart={handleDragStart}
            onDragOver={handleDrag}
        >
            <MainItemImageBox
                type={calculatorType}
            />

            <CloseButton />

            <JournalsBox calculatorType={calculatorType} />

            <CalculatorForm calculatorType={calculatorType} />

            <ArtefactsBox />

            <TotalFoodTaxBox calculatorType={calculatorType} />

            <CraftingButton calculatorType={calculatorType} />

            <ItemsQuantityBox />
        </StyledCraftingForm>
    )
};

export default GMCraftingForm;
