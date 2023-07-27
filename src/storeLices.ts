import { getFavoritesAmount, getUserData } from "./index.js";
import { renderUserBlock } from "./user.js";
import { renderToast } from "./lib.js";

// Стор избранных отелей, добавить и исключить из избранных

export function storeLices(action: EventTarget): void | object {
    switch ((<HTMLElement>action).getAttribute('name')) {
        case 'favorites':
            let userLocal = getFavoritesAmount().join('')
            if (userLocal.indexOf((<HTMLElement>action).id) >= 0) {
                localStorage.setItem("favoritesAmount", `${userLocal.replace(`${(<HTMLElement>action).id}`, '')}`);
                (<HTMLElement>action).className = 'favorites'
                renderUserBlock(getUserData('name'), getUserData('avatar'), getFavoritesAmount().length)

            } else{
                localStorage.setItem("favoritesAmount", `${userLocal}${(<HTMLElement>action).id}`);
                (<HTMLElement>action).className = 'favorites active'
                renderUserBlock(getUserData('name'), getUserData('avatar'), getFavoritesAmount().length)
            }
            break;

        case 'cheking':
            renderToast(
                {text: `Идет бронирование. С Вами скоро свяжуться.`, type: 'success'},
                {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
            )
            break;
        default:
        break;
    }
}