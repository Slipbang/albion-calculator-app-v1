interface ILink {
    linkName?: {
        ru: string,
        en: string,
    }
    link: string;
}

export type TLinks = ILink[];

export const links: TLinks = [
    {
        linkName: {
            ru: 'Калькулятор',
            en: 'Calculator'
        },
        link: '/calculator',
    },
    {
        linkName: {
            ru: 'Артефакты',
            en: 'Artefacts'
        },
        link: '/artefacts',
    },
    {
        linkName: {
            ru: 'Транспортировка',
            en: 'Transportation'
        },
        link: '/transportation',
    },
    {
        linkName: {
            ru: 'FAQ',
            en: 'FAQ',
        },
        link: '/FAQ'
    },
];