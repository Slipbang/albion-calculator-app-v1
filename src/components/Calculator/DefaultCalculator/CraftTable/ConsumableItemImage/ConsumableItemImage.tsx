import {srcRoute} from "../../../../../store/api/api";

import StyledImageBox from "../../../StyledComponentsCommon/StyledImageBox";
import {TSelectedLanguage} from "../../../../../types/languageTypes";
import {TConsumableNames} from "../../../../../types/ConsumableNamesType";

interface IConsumableItemImageProps {
    resourceKeys: string;
    selectedLanguage: TSelectedLanguage;
    extraResourceStyles: string;
    consumableNamesData: TConsumableNames,
}

const ConsumableItemImage = (props: IConsumableItemImageProps) => {
    const {resourceKeys, selectedLanguage, extraResourceStyles, consumableNamesData} = props;

    return (
        <>
            {!resourceKeys?.includes('FISHSAUCE') && !resourceKeys?.includes('ALCHEMY_EXTRACT')
                ? <img src={`${srcRoute}${resourceKeys}`} title={consumableNamesData[resourceKeys]?.[selectedLanguage] || 'name is not found'} alt=""/>
                : (<div className={extraResourceStyles} title={consumableNamesData[resourceKeys]?.[selectedLanguage] || 'name is not found'}>
                    <StyledImageBox $position={'static'} $image={`${srcRoute}${resourceKeys}1`} $width={25} $height={65} $backgroundPosition={'left'} />
                    <StyledImageBox $position={'static'} $image={`${srcRoute}${resourceKeys}2`} $width={15} $height={65} $backgroundPosition={'center'} />
                    <StyledImageBox $position={'static'} $image={`${srcRoute}${resourceKeys}3`} $width={25} $height={65} $backgroundPosition={'right'} />
                </div>)}
        </>
    )
}

export default ConsumableItemImage;