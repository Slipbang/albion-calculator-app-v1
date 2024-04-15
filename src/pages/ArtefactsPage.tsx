import Artefacts from "../components/Artefacts/Artefacts";
// import {useParams} from "react-router-dom";
// import {TExtendedTClass} from "../store/artefacts/artefact-slice";
// import {TConsumables} from "../types/artefactTypes";
// import {TTier} from "../types/craftItemsType";
// import NotFound from "../components/NotFound/NotFound";

const ArtefactsPage = () => {
    // const {artefactClass, artefactType, artefactTier} = useParams<'artefactClass' | 'artefactType' | 'artefactTier'>();
    //
    // const artefactClasses: TExtendedTClass[] = ['warrior', 'hunter', 'mage', 'allClasses'];
    //
    // const artefactTypes: TConsumables[] = ['runes', 'souls', 'relicts', 'avalonianShards'];
    //
    // const artefactTiers: TTier[] = ['T4', 'T5', 'T6', 'T7', 'T8'];
    //
    // if (artefactClasses.includes(artefactClass as TExtendedTClass) && artefactTypes.includes(artefactType as TConsumables) && artefactTiers.includes(artefactTier as TTier)) {
    //     return <Artefacts/>
    // }
    //
    // return <NotFound />
    return <Artefacts/>
}

export default ArtefactsPage;