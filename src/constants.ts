import { FlatRentSdk } from "./flat-rent-sdk.js"
import { renderEmptyOrErrorSearchBlock } from "./search-results.js"
import { ValidAgentArr } from "./validationArr.js"


// Лист констант
// 1. Объект данных заданный пользователев из блока фильтра списка отелей
// 2. Формирование нового экземпляра класса валидации списка отелей, 
//....согласно выбору пользователя
export function userSearch(userActions=false){
    if(userActions){
return {
        city :     (<HTMLInputElement>document.getElementById('city')).value,
        firstDate:  (<HTMLInputElement>document.getElementById('check-in-date')).value,
        lastDate:   (<HTMLInputElement>document.getElementById('check-out-date')).value,
        price:      parseInt((<HTMLInputElement>document.getElementById('max-price')).value),
        homy:       (<HTMLInputElement>document.getElementById('homy')).checked,
        flatRent:   (<HTMLInputElement>document.getElementById('flat-rent')).checked,
    }
}else{
    renderEmptyOrErrorSearchBlock("Что то пошло не так")
    return {
        city :     "Санкт-Петербург",
        firstDate:  "2023-01-01",
        lastDate:   "2023-01-01",
        price:      0,
        homy:       true,
        flatRent:   true,
    }
}
}

export function generateClassValidation(userActions=false, filters?: string){ 
    if(userActions && !filters){
       return new ValidAgentArr(
                parseInt((<HTMLInputElement>document.getElementById('max-price')).value), 
                Date.parse(userSearch(true).firstDate), 
                Date.parse(userSearch(true).lastDate), 
                'https://raw.githubusercontent.com/ilias222/api/main/db.backup.json', 
                FlatRentSdk,
                'places', 
                'database'
        )
       }
    if(userActions && filters){
        return new ValidAgentArr(
            parseInt((<HTMLInputElement>document.getElementById('max-price')).value), 
            Date.parse(userSearch(true).firstDate), 
            Date.parse(userSearch(true).lastDate), 
            'https://raw.githubusercontent.com/ilias222/api/main/db.backup.json', 
            FlatRentSdk,
            'places', 
            'database',
            `${filters}`
    )
    } else{
        renderEmptyOrErrorSearchBlock("Что то пошло не так")
        return null
    }
    }