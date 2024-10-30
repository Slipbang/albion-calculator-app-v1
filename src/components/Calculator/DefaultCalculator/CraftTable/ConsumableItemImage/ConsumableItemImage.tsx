import {srcRoute} from "../../../../../store/api/api";

import StyledImageBox from "../../../StyledComponentsCommon/StyledImageBox";
import {TLanguageData, TSelectedLanguage} from "../../../../../types/languageTypes";

interface IConsumableItemImageProps {
    resourceKeys: string;
    selectedLanguage: TSelectedLanguage;
    extraResourceStyles: string;
    languageData: TLanguageData;
}

const ConsumableItemImage = (props: IConsumableItemImageProps) => {
    const {selectedLanguage, extraResourceStyles, languageData, resourceKeys} = props;

    const resourceName = languageData?.[resourceKeys]?.[selectedLanguage] || 'name is not found';

    return (
        <>
            {!resourceKeys?.includes('FISHSAUCE') && !resourceKeys?.includes('ALCHEMY_EXTRACT')
                ? <img src={`${srcRoute}${resourceKeys}`} title={resourceName} alt=""/>
                : (<div className={extraResourceStyles} title={resourceName}>
                    <StyledImageBox $position={'static'} $image={`${srcRoute}${resourceKeys}1`} $width={25} $height={65} $backgroundPosition={'left'} />
                    <StyledImageBox $position={'static'} $image={`${srcRoute}${resourceKeys}2`} $width={15} $height={65} $backgroundPosition={'center'} />
                    <StyledImageBox $position={'static'} $image={`${srcRoute}${resourceKeys}3`} $width={25} $height={65} $backgroundPosition={'right'} />
                </div>)}
        </>
    )
}

export default ConsumableItemImage;