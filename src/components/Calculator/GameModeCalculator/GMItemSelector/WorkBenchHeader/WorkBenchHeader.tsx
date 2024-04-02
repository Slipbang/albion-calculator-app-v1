import StyledImageBox from "../../../StyledComponentsCommon/StyledImageBox";
import {dialogWindow} from "../GMItemSelectorImgReexports/GMItemSelectorImgReexports";
import React from "react";
import {useSelector} from "react-redux";
import {
    selectWorkBenchAvatar,
    selectWorkBenchType,
    selectWorkBenchWorkerAvatar
} from "../../../../../store/GMProfit/gm-profit-selectors";
import styles from './WorkBenchHeader.module.scss';
import {selectLanguage} from "../../../../../store/language/language-selector";
import {ICraftingItemClass, TWorkBenchNames} from "../../../../../types/craftItemsType";

type TNameObject = {
    [key in ICraftingItemClass]: TWorkBenchNames
}


interface IWorkBenchNames {
    'ru': TNameObject,
    'en': TNameObject,
}

const workBenchNames: IWorkBenchNames = {
    'ru': {
        warrior: 'Кузница',
        hunter: 'Охотничий домик',
        mage: 'Башня мага',
        toolmaker: 'Слесарка',
        smelter: 'Плавильня',
        lumbermill: 'Лесопилка',
        tanner: 'Кожемятня',
        stonemason: 'Каменоломня',
        weaver: 'Ткацкая мастерская'
    },
    'en': {
        warrior: 'Warrior\'s Forge',
        hunter: 'Hunter\'s Lodge',
        mage: 'Mage\'s Tower',
        toolmaker: 'Toolmaker',
        smelter: 'Smelter',
        lumbermill: 'Lumbermill',
        tanner: 'Tanner',
        stonemason: 'Stonemason',
        weaver: 'Weaver',
    },
};

const WorkBenchHeader = () => {

    const workBenchAvatar = useSelector(selectWorkBenchAvatar);
    const workBenchWorkerAvatar = useSelector(selectWorkBenchWorkerAvatar);
    const selectedWorkBenchType = useSelector(selectWorkBenchType)
    const {language, selectedLanguage} = useSelector(selectLanguage);
    const {GMItemSelectorStings} = language;


    return <div className={styles.workBenchHeader}>
        <div className={styles.workBenchAvatarBox}>
            <StyledImageBox
                $image={workBenchAvatar}
                $position={'static'}
                $width={76}
                $height={77}
                $hasDropShadow={false}
            />
            <p>{workBenchNames[selectedLanguage][selectedWorkBenchType]}</p>
        </div>

        <div className={styles.workerAvatarBox}>
            <StyledImageBox
                $image={workBenchWorkerAvatar}
                $position={'static'}
                $width={56}
                $height={57}
                $hasDropShadow={true}
                $zIndex={3}
            />
            <div className={styles.workerDialog}>
                <StyledImageBox
                    $image={dialogWindow}
                    $position={'static'}
                    $width={220}
                    $height={46}
                    $hasDropShadow={true}
                />
                <p>{GMItemSelectorStings.dialogText}</p>
            </div>
        </div>
    </div>
}

export default WorkBenchHeader;