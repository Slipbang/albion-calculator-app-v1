export type TUrlKeys = 'calculator' | 'artefacts' | 'transportation' | 'FAQ';

interface ILink {
    linkName?: {
        ru: string,
        en: string,
    }
    link: TUrlKeys;
}

export type TLinks = ILink[];

export const links: TLinks = [
    {
        linkName: {
            ru: 'Калькулятор',
            en: 'Calculator'
        },
        link: 'calculator',
    },
    {
        linkName: {
            ru: 'Артефакты',
            en: 'Artifacts'
        },
        link: 'artefacts',
    },
    {
        linkName: {
            ru: 'Транспортировка',
            en: 'Transportation'
        },
        link: 'transportation',
    },
    {
        linkName: {
            ru: 'FAQ',
            en: 'FAQ',
        },
        link: 'FAQ'
    },
];