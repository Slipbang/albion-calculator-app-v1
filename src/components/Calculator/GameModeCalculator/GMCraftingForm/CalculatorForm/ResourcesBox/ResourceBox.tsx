import styles from './ResourceBox.module.scss'
import {useMaterialsCalculation} from "../../Hooks/useMaterialsCalculation";
import {useJournals} from "../../Hooks/useJournals";
import {selectBackpackItems, selectWorkBenchItem} from "../../../../../../store/GMProfit/gm-profit-selectors";
import {
    selectEnchantmentNumCF,
    selectItemsQuantityCF,
    selectJournalUsageCF,
    selectMaterialEnchantmentCF,
} from "../../../../../../store/interface/interface-selector";
import {useSelector} from "react-redux";

const ResourceBox = () => {

    const isJournalUsed = useSelector(selectJournalUsageCF);
    const backpackItems = useSelector(selectBackpackItems);
    const enchantmentNum = useSelector(selectEnchantmentNumCF);
    const selectedWorkBenchItem = useSelector(selectWorkBenchItem);
    const itemsQuantity = useSelector(selectItemsQuantityCF);
    const materialEnchantment = useSelector(selectMaterialEnchantmentCF);

    const {
        backpackMatsQuantity,
        matsKeys,
        consumedMaterials,
        materialApiId,
    } = useMaterialsCalculation({backpackItems, materialEnchantment, itemsQuantity, selectedWorkBenchItem, enchantmentNum});

    const {artefactItemId, artefactsQuantity} = selectedWorkBenchItem;

    const {emptyJournalImage, totalJournalQuantity} = useJournals({itemsQuantity, enchantmentNum, selectedWorkBenchItem, isJournalUsed});

    const totalArtefactQuantity = artefactsQuantity! * itemsQuantity

    const srcRoute = 'https://render.albiononline.com/v1/item/';

    return <div className={styles.resourcesBox}>
        {matsKeys.map(key => {
            return !!selectedWorkBenchItem[key] && <div key={key}>
                <img
                    src={`${srcRoute}${materialApiId[`${key}ApiId`]}`}
                    alt=""
                />
                <div className={styles.resourceQuantityBox}>
                    <p>{backpackMatsQuantity[`backpack${key}Quantity`]}/</p>
                    <p>{consumedMaterials[`consume${key}Quantity`]! || selectedWorkBenchItem[key]! * (key === 'STONEBLOCK' ? Math.pow(2, +enchantmentNum) : 1)}</p>
                </div>
            </div>
        })}
        {!!artefactItemId && <div>
            <img
                src={`${srcRoute}${artefactItemId}`}
                alt=""
            />
            <div className={styles.resourceQuantityBox}>
                <p>{totalArtefactQuantity}</p>
            </div>
        </div>}
        {isJournalUsed && <div>
            <img
                src={emptyJournalImage}
                alt=""
            />
            <div className={styles.resourceQuantityBox}>
                <p>{totalJournalQuantity.toFixed(2)}</p>
            </div>
        </div>}
    </div>
}

export default ResourceBox;