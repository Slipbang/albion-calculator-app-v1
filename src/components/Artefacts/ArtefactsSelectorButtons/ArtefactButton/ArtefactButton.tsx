import StyledArtefactButton from "../../StyledArtefactsComponents/StyledArtefactButton";
import {artefactActions, TExtendedTClass} from "../../../../store/artefacts/artefact-slice";
import {useSelector} from "react-redux";
import {selectArtefactsClass, selectArtefactsType} from "../../../../store/artefacts/artefact-selectors";
import {useAppDispatch} from "../../../../store";
import {TArtefactTypes} from "../../../../types/artefactTypes";

interface IArtefactButtonProps {
    image: string;
    selectedImage: string;
    hoveredImage: string;
    type: TArtefactTypes | TExtendedTClass;
}

const ArtefactButton = (props: IArtefactButtonProps) => {
    const { image, selectedImage, hoveredImage, type} = props;

    const dispatchAction = useAppDispatch();

    const defineType = (): boolean => {
        switch (type) {
            case 'RUNE':
            case 'SOUL':
            case "RELIC":
            case "AVALONIAN":
                return true;
            default:
                return false;
        }
    }

    const isTConsumables = defineType();

    const selectHandler = () => {
        if (isTConsumables) {
            dispatchAction(artefactActions.setSelectedType(type as TArtefactTypes));
        } else {
            dispatchAction(artefactActions.setSelectedClass(type as TExtendedTClass));
        }
    }

    const selected = useSelector( isTConsumables ? selectArtefactsType : selectArtefactsClass);

    return (
        <StyledArtefactButton
            $isSelected={selected === type}
            $image={image}
            $selectedImage={selectedImage}
            $hoveredImage={hoveredImage}
            key={type}
            title={type}
            onClick={() => selectHandler()}
        />
    )
}

export default ArtefactButton