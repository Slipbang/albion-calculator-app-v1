import StyledArtefactButton from "../../StyledArtefactsComponents/StyledArtefactButton";
import {artefactActions, TExtendedTClass} from "../../../../store/artefacts/artefact-slice";
import {useSelector} from "react-redux";
import {selectArtefactsClass, selectArtefactsType} from "../../../../store/artefacts/artefact-selectors";
import {useAppDispatch} from "../../../../store";
import {TArtefactTypes} from "../../../../types/artefactTypes";
// import {useNavigate, useParams} from "react-router-dom";
// import {useEffect} from "react";

interface IArtefactButtonProps {
    image: string;
    selectedImage: string;
    hoveredImage: string;
    type: TArtefactTypes | TExtendedTClass;
}

const ArtefactButton = (props: IArtefactButtonProps) => {
    const { image, selectedImage, hoveredImage, type} = props;

    // const {language, artefactClass, artefactType, artefactTier} = useParams<'language' | 'artefactClass' | 'artefactType' | 'artefactTier'>();
    // const navigate = useNavigate();

    const dispatchAction = useAppDispatch();

    const defineType = (): boolean => {
        switch (type) {
            case 'RUNES':
            case 'SOULS':
            case "RELICTS":
            case "AVALONIANSHARDS":
                return true;
            default:
                return false;
        }
    }

    const isTConsumables = defineType();

    const selectHandler = () => {
        if (isTConsumables) {
            dispatchAction(artefactActions.setSelectedType(type as TArtefactTypes));
            //navigate(`/${language}/artefacts/${artefactClass}/${type}/${artefactTier}`)
        } else {
            dispatchAction(artefactActions.setSelectedClass(type as TExtendedTClass));
            //navigate(`/${language}/artefacts/${type}/${artefactType}/${artefactTier}`)
        }
    }

    // useEffect(() => {
    //     dispatchAction(artefactActions.setSelectedClass(artefactClass as TExtendedTClass));
    //     dispatchAction(artefactActions.setSelectedType(artefactType as TConsumables));
    // }, [artefactClass, artefactType])

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