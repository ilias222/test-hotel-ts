import { ConcatListHotel } from "./concatArr.js"
import { Places } from "./interfaces.js"
import { renderEmptyOrErrorSearchBlock, renderOptionsSearchUser, renderSearchResultsBlock } from "./search-results.js"

/**
 * Класс обрабатывающий полученный массив объектов гостиниц из класса ConcatListHotel
 * для корректной загрузки и рендеринга на пользовательской странице;
 * Наследует от ConcatListHotel : STRPromise,objSdk, itemPromis, itemObj, arrList;
 * Добавляет входные параметры:
 * price: number - стоимость, введенная пользователем;
 * inDate: number - дата въезда;
 * outDate: number - дата выезда;
 * actions: string | undefined - параметр фильтрации объектов массифа гостиниц;
 * validArr: Promise<Places[]> - отфильтрованный массив, представляется в виде объекта
 * Promise<Places[]>
 * Методы:
 * 
 */
export class ValidAgentArr extends ConcatListHotel {
        protected price: number
        protected inDate: number
        protected outDate: number
        protected validArr: Promise<Places[]>
        protected actions: string | undefined
      
        constructor(
          price: number,
          inDate: number,
          outDate: number,
          STRPromise: string,
          objSdk: any,
          itemPromis: string,
          itemObj: string,
          actions?: string | undefined,
          arrList?: Promise<Places[]>,
          validArr?: Promise<Places[]>,
        )
        {
          super(STRPromise,objSdk, itemPromis, itemObj, arrList)
          this.price = price
          this.inDate = inDate
          this.outDate = outDate
          this.validArr = this.handleValidArr(this.arrList)
          this.actions = actions
          this.handleRenderHotel(this.validArr, this.price, this.actions)
        }

        //Сдесь нет inDate?: number, outDate?: number

        private async handleRenderHotel(
          arr: Promise<Places[]>, 
          price: number,  
          acions?: string
          ): Promise<void>{
          try{
            
          //Фильтруем список отелей, согласно заданным полям поиска (не работает с датами!)
          await arr.then(item =>{
              let filtArr = item.filter(child => child.price <= price)
              //Принимает и фиьтрует даты въезда и выезда, в миллисекундах от 1 января 1970
              //    filtArr.forEach(child =>{
              //    child.push( 
              //           child.bookedDates.filter(itemDat =>{ 
                          //   itemDat === inDate
                          //   &&
                          //   itemDat >= outDate
                          // }) 
              //    )
              // })
              if(filtArr.length <= 0){
                throw new Error();
              } else{
                this.handleFilters(filtArr, acions)
              }
          })
          } catch {
            renderEmptyOrErrorSearchBlock("Нет результатов")
          } 
        }

        // Рендеринг списка отелей, согласно заданным параметрам
        private handleFilters(filtArr: Places[], actions?: string): void{
          switch (actions) {
            case 'freeList':
              filtArr.sort((a, b) =>{
                if(a.price < b.price){
                return -1
                } else {
                return 1
                }  
              })
              renderOptionsSearchUser ()
              filtArr.map(item => renderSearchResultsBlock (item))
              break;

            case 'hardList':
              filtArr.sort((a, b) =>{
                if(a.price < b.price){
                return 1
                } else {
                return -1
                } 
              })
              renderOptionsSearchUser ()
              filtArr.map(item => renderSearchResultsBlock (item))
              break;

            // Здесь должен быть функционал вывода листа отеля, выбранного из списка
            // case 'itemHotell':
            //   break;

            default:
              renderOptionsSearchUser ()
              filtArr.map(item => renderSearchResultsBlock (item))
              break;
          }
        }
      
        // Проверка входящих объектов списков отелей, на соответствие интерфейсу Places
        // Если не соблюден интерфейс, в консоли выйдет ошибка. Список не сформируется.
        private async handleValidArr(arrList: Promise<Places[]>): Promise<Places[]>{
          const arr = arrList
          try{
              await arr.then(item =>{
              item.forEach((child: Places, index: number)=>{
                if(!child.id || !child.description || !child.price || !child.image){
                  throw new SyntaxError("Не соответствие объекта гостиниц интерфейсу Places");
                } else{
                child.id = index + 1
                child.description = String(child.description)
                child.price = Number(child.price)
                }
              })
            }
            )
           return arr
          } catch (e:any) {
            console.log(e.name, e.message)
          }
          return arr
        }
  }
  
  // let test2 = new ValidAgentArr(5000, new Date (), new Date, 'https://raw.githubusercontent.com/ilias222/api/main/db.backup.json', FlatRentSdk,
  //                                  'places', 'database')
  // console.log(test2)