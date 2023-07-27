import { Places } from "./interfaces.js"

/**
 * Класс получающий объекты гостиниц из API и/или из SDK;
 * В конечном итоге отдает объект Promise<arrList>;
 * Не вызывается в клиентском коде, наследуется;
 * классом ValidationArr
 * Получает на вход:
 * STRPromise - string значение, адрес запроса объекта;
 * objSDK - новый экземпляр класса SDK, для получения объекта гостиниц;
 * itemPromise - string значение, переход к значению объекта, для получения массива гостиниц;
 * itenObj - string значение, переход к значению объекта, для получения массива гостиниц;
 * arrList - массив Array<Places>, получаемый при соединении массивов SDK и API;
 * Параметры:
 * handleSDK - создает новый экземпляр класса SDK и передает его в handlePromis
 * принимает objSDK: string;
 * handlePromis - запрашивает объект гостиниц через API, распарсивает его и соединяет к объектом SDK
 * принимает STRPromis: string, objSdk: any, itemPromis: string;
 */

export class ConcatListHotel {
        private STRPromise: string
        private objSdk: any
        private itemPromis: string
        private itemObj: string
        protected arrList: Promise<Places[]>
    
        constructor(
        STRPromise: string,
        objSdk: any,
        itemPromis: string,
        itemObj: string,
        arrList?: Promise<Places[]>
        )
        {
        this.STRPromise = STRPromise
        this.objSdk = objSdk
        this.itemPromis = itemPromis
        this.itemObj = itemObj
        this.arrList = this.handleSDK(itemObj)
        }
        private handleSDK(itemObj: string):Promise<Places[]>{
            const obj = new this.objSdk()
            return this.handlePromis(this.STRPromise, JSON.parse(obj[itemObj]), this.itemPromis)
        }
    
        private async handlePromis(STRPromis: string, objSdk: any, itemPromis?: string): Promise<Places[]>{
            return await fetch(`${STRPromis}`)
            .then(response => response.json())
            .then(data => {
                if(itemPromis){
                return objSdk.concat(Object.values(data[itemPromis]))
                } else{
                    return objSdk.concat(Object.values(data))
                }
            })
        }
  }
//   let test = new ConcatListHotel('https://raw.githubusercontent.com/ilias222/api/main/db.backup.json', FlatRentSdk,
//                                    'places', 'database')
//   console.log(test)