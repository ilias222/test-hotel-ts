import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { storeLices } from './storeLices.js'
import { generateClassValidation } from './constants.js'
import { storeFiltersFormHotel } from './storeFiltersFormHotel.js'
import { Users } from './interfaces.js'

// Работа с локальным стором, для получения аватара, число избраных отелей
export function getUserData (nam: string):string{
  const test = localStorage.getItem('users')
  if(test){
  const users: Users = JSON.parse(test)
  switch (nam) {
    case 'name':
      return users.username
    case 'avatar':
      return users.avatarUrl
    default:
      return ''
  }
  }
  return ''
}

// работа с локальным стором, запись и возврат индексов избранных отелей
export function getFavoritesAmount(): Array<string | null>{
                  if (localStorage.getItem('favoritesAmount')){
                    // Если сделаю - const favorites = [...[localStorage.getItem('favoritesAmount')]]
                    // Ошибки не будет, но работает не правильно
                  const favorites: Array<string> = [...localStorage.getItem('favoritesAmount')]
                  console.log('Ответ из локал сторендж', favorites)
                  return favorites
                  }
                  return [] 
}

window.addEventListener('DOMContentLoaded', () => {
  // после загрузки страницы и разметки, выводиться:
  // аватар, количество избранных
  // рендер блока пользователя и панели фильтров
  localStorage.setItem("users", '{"username": "User", "avatarUrl": "./img/avatar.png"}');
  renderUserBlock(getUserData('name'), getUserData('avatar'), getFavoritesAmount().length);
  renderSearchFormBlock();
  renderSearchStubBlock();

  // При взаимодействии с формой поиска, вывод листа отелей
  (<HTMLElement>document.querySelector('.uped')).addEventListener('click', (event: MouseEvent) =>{
    (<MouseEvent>event).preventDefault()
    if((<HTMLElement>event.target).className == 'button-search'){
       generateClassValidation(true);
    }
  }); 

  // Обработчик событий при взаимодействии с блоком листа отелей
  (<HTMLElement>document.getElementById('search-results-block')).addEventListener('click', event => {

    // Фильтр - дороже, дешевле
    (<EventTarget>event.target).addEventListener('change', function() {
      storeFiltersFormHotel(<EventTarget>event.target)
    });

    // Добавление или исключение избраных
    if((<HTMLElement>event.target).className == 'favorites' || (<HTMLElement>event.target).className == 'favorites active'){
    storeLices(<EventTarget>event.target)
    }

    // Бронирование, появляется много - если имя класса
    if((<HTMLElement>event.target).className == 'bloked'){
      storeLices(<EventTarget>event.target)
    }
  })
})
