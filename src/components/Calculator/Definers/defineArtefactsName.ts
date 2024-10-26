import {TArtefactData, TArtefacts} from "../../../types/artefactTypes";
import {TArtefactName} from "../DefaultCalculator/InfoTable/InfoTable";
//import {artefacts} from "../../../store/Items/currentConfigurationItems";

const defineArtefactsName = ({artefactId, artefacts}: {artefactId?: string, artefacts: TArtefacts}) => {
    let artefactName: TArtefactName = {
        ru: '',
        en: ''
    }

    const iterateArtefactsData = (artefacts: any) => {
        for (const key in artefacts) {
            if (Array.isArray(artefacts[key])) {
                if (!!artefactId) {
                    if (!!artefacts[key].find((item: TArtefactData) => artefactId.includes(item.artefactId))) {
                        artefactName = artefacts[key].find((item: TArtefactData) => artefactId.includes(item.artefactId)).artefactName;
                    } else {
                        if (artefactId!.includes('T4_SKILLBOOK_STANDARD')) {
                            artefactName = {
                                en: 'Adept\'s Tome of Insight',
                                ru: 'Книга интуиции знатока',
                            }
                        }
                    }
                }
            } else {
                iterateArtefactsData(artefacts[key])
            }
        }
    };

    iterateArtefactsData(artefacts);

    return {artefactName}
}

export {defineArtefactsName};