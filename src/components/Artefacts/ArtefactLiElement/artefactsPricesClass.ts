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
        public currentDate: Date,
    ) {}

    cities: TCities[] = ['Caerleon', 'Thetford', 'Bridgewatch', 'Lymhurst', 'Fort Sterling', 'Martlock', 'Brecilien'];

    fullArtefactId = `${this.artefactTier}_${this.artefactId}`

    getPrice = (city: TCities) => {
        return this.artefactsPriceData?.find(item => item.location === city && item.itemId === this.fullArtefactId)?.sellPriceMin || 0;
    }

    getDate = (city: TCities) => {
        const sellPriceMinDate = this.artefactsPriceData?.find(item => item.location === city && item.itemId === this.fullArtefactId)?.sellPriceMinDate || '';

        if (sellPriceMinDate === '1970-01-01T00:00:00.000Z') return '';

        const hours = (this.currentDate.getTime() - Date.parse(sellPriceMinDate))/(60*60*1000);

        return `<span style="color: ${hours <= 5 ? "green" : "red"}">(${hours <= 24 ? `${Math.round(hours)}h` : `${Math.round(hours/24)}d`})</span>`;
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
                        <tbody>${this.cities.map(city => `
                           <tr>
                              <td>${city}</td>
                              <td>
                                    ${(!this.isArtefactsFetching && !this.isErrorArtefacts) ? `${this.getPrice(city) || '-'} ${this.getDate(city) || ''}` : ''}
                                    ${(this.isArtefactsFetching && !this.isErrorArtefacts) ? 'loading...' : ''}
                                    ${this.isErrorArtefacts ? 'error!' : ''}
                              </td>
                           </tr>`).join('')}
                        </tbody>
                     </table
                     <p>${this.artefactsStrings.value} ${this.itemValue[this.artefactTierNum - 4]}</p>
                  <div/>`;
}

