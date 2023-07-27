import { generateClassValidation } from "./constants.js";

// Стор свитча, используется для обращения в классу валидации массива
// для отображения отелей, дешевле-дороже

export function storeFiltersFormHotel(acions: EventTarget){
    switch ( (<HTMLSelectElement>acions).selectedIndex) {
      case 1:
        generateClassValidation(true, 'freeList')
        break;

      case 2:
        generateClassValidation(true, 'hardList')
        break;
    
      default:
        console.log(
          'Неожиданный индекс селектра формы', 
          (<HTMLSelectElement>acions).selectedIndex
          )
        break;
    }
  }