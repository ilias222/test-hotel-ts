// Формирование блока избранного отеля, если он был в локальном сторе
// Иначе будет отправлен блок с не активным блоком избранного (лайк значек)

export function favoritesActivHTMLElement(arrLocal: Array<string | null>, id: number):string{
    if(arrLocal && arrLocal.indexOf(`${id}`) >= 0){
        console.log(arrLocal.indexOf(`${id}`), id)
        return `<div class="favorites active" id="${id}" name="favorites"></div>`
    } else {
        console.log(arrLocal.indexOf(`${id}`), id)
        return `<div class="favorites" id="${id}" name="favorites"></div>`
    }
}