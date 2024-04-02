import {IItemsData, TCities} from "../../../types/InfoTableTypes";
import {TArtefactsTier} from "../../../store/artefacts/artefact-slice";
import {ISelectedLanguage} from "../../../types/languageTypes";

export class artefactsPrices {
    constructor(
        public artefactsStrings: ISelectedLanguage['artefactsStrings'],
        public artefactsPriceData: IItemsData[] | undefined,
        public isArtefactsFetching: boolean,
        public isErrorArtefacts: boolean,
        public artefactTier: TArtefactsTier,
        public itemValue: number[],
        public artefactId: string,
    ) {
    }

    cities: TCities[] = ['Caerleon', 'Thetford', 'Bridgewatch', 'Lymhurst', 'Fort Sterling', 'Martlock', 'Brecilien'];

    fullArtefactId = `${this.artefactTier}_${this.artefactId}`

    getPrice = (city: TCities) => {
        return this.artefactsPriceData?.find(item => item.location === city && item.itemId === this.fullArtefactId)?.buyPriceMax || 0;
    }

    artefactTierNum = +this.artefactTier.split('T')[1];

    titleTable = ` <div>
                   <table>
                   <thead>
                      <tr>
                         <th>
                            ${this.artefactsStrings.city}
                         </th>
                         <th>
                            ${this.artefactsStrings.price}
                         </th>
                  </tr>
                  </thead>
                  <tbody>
                   ${this.cities.map(city => `
                        <tr>
                             <td>
                                 ${city}
                             </td>
                              <td>
                                 ${(!this.isArtefactsFetching && !this.isErrorArtefacts) ? (this.getPrice(city) || '-') : ''}
                                 ${(this.isArtefactsFetching && !this.isErrorArtefacts) ? 'loading...' : ''}
                                 ${this.isErrorArtefacts ? 'error!' : ''}
                              </td>
                        </tr>
                   `).join('')}
                   </tbody>
                 </table
                 <p>${this.artefactsStrings.value} ${this.itemValue[this.artefactTierNum - 4]}</p>
                 <div/>
            `
}