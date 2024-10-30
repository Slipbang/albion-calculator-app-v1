export type TArtefactData = {
    id: string;
    equipmentImg: string;
    itemValue: number[];
    artefactId: string;
}

export type TArtefactClass = 'WARRIOR' | 'MAGE' | 'HUNTER';

export type TArtefactTypes = 'RUNE' | 'SOUL' | 'RELIC' | 'AVALONIAN';

export type TArtefactObject = {
    [key in TArtefactTypes]: TArtefactData[];
}

export type TArtefacts = {
    [key in TArtefactClass]: TArtefactObject;
}
