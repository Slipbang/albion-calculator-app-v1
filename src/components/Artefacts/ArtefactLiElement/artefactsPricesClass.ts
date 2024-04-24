import {IItemsData, TCities} from "../../../types/InfoTableTypes";
import {TArtefactsTier} from "../../../store/artefacts/artefact-slice";
import {ISelectedLanguage} from "../../../types/languageTypes";
import {UtilsMethodsClass} from "../../Calculator/DefaultCalculator/InfoTable/TableClasses/UtilsMethodsClass";

export class artefactsPrices extends UtilsMethodsClass{
    constructor(
        public artefactsStrings: ISelectedLanguage['artefactsStrings'],
        public artefactsPriceData: IItemsData[] | undefined,
        public isArtefactsFetching: boolean,
        public isErrorArtefacts: boolean,
        public artefactTier: TArtefactsTier,
        public itemValue: number[],
        public artefactId: string,
        public currentDate: Date,
    ) {
        super(currentDate)
    }

    cities: TCities[] = ['Caerleon', 'Thetford', 'Bridgewatch', 'Lymhurst', 'Fort Sterling', 'Martlock', 'Brecilien'];

    fullArtefactId = `${this.artefactTier}_${this.artefactId}`;

    getArtefactsData = (city: TCities) => {
        const sellPriceMin = this.artefactsPriceData?.find(item => item.location === city && item.itemId === this.fullArtefactId)?.sellPriceMin || 0;
        const sellPriceMinDate = this.artefactsPriceData?.find(item => item.location === city && item.itemId === this.fullArtefactId)?.sellPriceMinDate || '';
        return {sellPriceMin,sellPriceMinDate}
    }

    artefactTierNum = +this.artefactTier.split('T')[1];

    titleTable = `<div>
                     <table>
                        <thead>
                           <tr>
                              <th>${this.artefactsStrings.city}</th>
                              <th>${this.artefactsStrings.price}</th>
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
                     <p>${this.artefactsStrings.value} ${this.itemValue[this.artefactTierNum - 4]}</p>
                  <div/>`;
}

