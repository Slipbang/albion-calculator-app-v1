export type TArtefactData = {
    id: string;
    artefactName: {
        ru: string,
        en: string,
    }
    equipmentImg: string;
    itemValue: number[];
    artefactId: string;
    wasCopied?: boolean;
    wasChecked?: boolean;
}

export interface IConsumables {
  runes: TArtefactData[];
  souls: TArtefactData[];
  relicts: TArtefactData[];
  avalonianShards: TArtefactData[];
}

export interface IArtefacts {
    warrior: IConsumables;
    mage: IConsumables;
    hunter: IConsumables;
}

export type TClass = 'warrior' | 'mage' | 'hunter';

export type TConsumables = 'runes' | 'souls' | 'relicts' | 'avalonianShards';