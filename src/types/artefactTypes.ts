export type TArtefactData = {
    id: string;
    artefactName: {
        ru: string,
        en: string,
    }
    equipmentImg: string;
    itemValue: number[];
    artefactId: string;
}

export type TArtefactClass = 'WARRIOR' | 'MAGE' | 'HUNTER';

export type TArtefactTypes = 'RUNES' | 'SOULS' | 'RELICTS' | 'AVALONIANSHARDS';

export type TArtefactObject = {
    [key in TArtefactTypes]: TArtefactData[];
}

export type TArtefacts = {
    [key in TArtefactClass]: TArtefactObject;
}
