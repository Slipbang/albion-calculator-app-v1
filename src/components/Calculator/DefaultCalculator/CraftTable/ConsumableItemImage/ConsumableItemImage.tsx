import {srcRoute} from "../../../../../store/api/api";
import {consumablesNamesData} from "../../../../../store/Items/consumablesNamesData";
import StyledImageBox from "../../../StyledComponentsCommon/StyledImageBox";
import {TSelectedLanguage} from "../../../../../types/languageTypes";

interface IConsumableItemImageProps {
    resourceKeys: string;
    selectedLanguage: TSelectedLanguage;
    extraResourceStyles: string;
}

const ConsumableItemImage = (props: IConsumableItemImageProps) => {
    const {resourceKeys, selectedLanguage, extraResourceStyles} = props;
    return (
        <>
            {!resourceKeys?.includes('FISHSAUCE') && !resourceKeys?.includes('ALCHEMY_EXTRACT')
                ? <img src={`${srcRoute}${resourceKeys}`} title={consumablesNamesData[resourceKeys]?.[selectedLanguage] || 'name is not found'} alt=""/>
                : (<div className={extraResourceStyles} title={consumablesNamesData[resourceKeys]?.[selectedLanguage] || 'name is not found'}>
                    <StyledImageBox $position={'static'} $image={`${srcRoute}${resourceKeys}1`} $width={25} $height={65} $backgroundPosition={'left'} />
                    <StyledImageBox $position={'static'} $image={`${srcRoute}${resourceKeys}2`} $width={15} $height={65} $backgroundPosition={'center'} />
                    <StyledImageBox $position={'static'} $image={`${srcRoute}${resourceKeys}3`} $width={25} $height={65} $backgroundPosition={'right'} />
                </div>)}
        </>
    )
}

export default ConsumableItemImage;