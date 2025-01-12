import {IItemsData, TCities} from "../../../types/InfoTableTypes";
import {TArtefactsTier} from "../../../store/artefacts/artefact-slice";
import {ISelectedLanguage} from "../../../types/languageTypes";
import {UtilsMethodsClass} from "../../Calculator/DefaultCalculator/InfoTable/TableClasses/UtilsMethodsClass";

export class artefactsPrices extends UtilsMethodsClass{
    public artefactsStrings!: ISelectedLanguage['artefactsStrings'];
    public artefactsPriceData!: IItemsData[] | undefined;
    public isArtefactsFetching!: boolean;
    public isErrorArtefacts!: boolean;
    public artefactTier!: TArtefactsTier;
    public itemValue!: number[];
    public artefactId!: string;
    public fullArtefactId: string;
    public artefactTierNum: number;
    cities: TCities[] = ['Caerleon', 'Thetford', 'Bridgewatch', 'Lymhurst', 'Fort Sterling', 'Martlock', 'Brecilien'];

    constructor(
        artefactsStrings: ISelectedLanguage['artefactsStrings'],
        artefactsPriceData: IItemsData[] | undefined,
        isArtefactsFetching: boolean,
        isErrorArtefacts: boolean,
        artefactTier: TArtefactsTier,
        itemValue: number[],
        artefactId: string,
        currentDate: Date,
    ) {
        super(currentDate);
        this.currentDate = currentDate;
        this.artefactsStrings = artefactsStrings;
        this.artefactsPriceData = artefactsPriceData;
        this.isArtefactsFetching = isArtefactsFetching;
        this.isErrorArtefacts = isErrorArtefacts;
        this.artefactTier = artefactTier;
        this.itemValue = itemValue;
        this.artefactId = artefactId;
        this.currentDate = currentDate;

        this.fullArtefactId = `${this.artefactTier}_${this.artefactId}`;
        this.artefactTierNum = +this.artefactTier?.split('T')[1];
    }

    getArtefactsData = (city: TCities) => {
        const sellPriceMin = !!this.artefactsPriceData ? this.artefactsPriceData.find(item => item.location === city && item.itemId === this.fullArtefactId)?.sellPriceMin : 0;
        const sellPriceMinDate = !!this.artefactsPriceData ? this.artefactsPriceData.find(item => item.location === city && item.itemId === this.fullArtefactId)?.sellPriceMinDate : '';
        return {sellPriceMin,sellPriceMinDate}
    }

    get titleTable() {
        return `<div>
                     <table>
                        <thead>
                           <tr>
                              <th>${this.artefactsStrings?.city}</th>
                              <th>${this.artefactsStrings?.price}</th>
                           </tr>
                        </thead>
                        <tbody>${this.cities.map(city => {
            const {sellPriceMin, sellPriceMinDate} = this.getArtefactsData(city);
            return (
                `<tr>
                                     <td>${city}</td>
                                     <td>
                                         ${(!this.isArtefactsFetching && !this.isErrorArtefacts) ? `${sellPriceMin || '-'} ${this.getTime(sellPriceMinDate) || ''}` : ''}
                                         ${(this.isArtefactsFetching && !this.isErrorArtefacts) ? 'loading...' : ''}
                                         ${this.isErrorArtefacts ? 'error!' : ''}
                                    </td>
                                 </tr>`)
        }).join('')}
                        </tbody>
                     </table
                     <p>${this.artefactsStrings?.value} ${this.itemValue?.[this.artefactTierNum - 4]}</p>
                  <div/>`;
    }
}

