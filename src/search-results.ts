import { renderBlock, renderBlockSearch } from './lib.js'
import { Places } from './interfaces.js'
import { getFavoritesAmount } from './index.js'
import { favoritesActivHTMLElement } from './favoritesActivHTMLElemrnt.js'

// Вывод формы ошибки поиска, формы фильтра дешевле-дороже, листа отелей
// не реализован - страница отеля

export function renderSearchStubBlock () {
  renderBlock(
    'search-results-block',
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  )
}

export function renderEmptyOrErrorSearchBlock (reasonMessage: string):void {
  renderBlock(
    'search-results-block',
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  )
}

export function renderOptionsSearchUser () {
  renderBlock(
    'search-results-block',
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select id="select" class="selector">
                <option selected>Как фильтровать?</option>
                <option>Сначала дешёвые</option>
                <option>Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul id="results-list">
    </ul>
    `
  )
}

export function renderPagesHotels(data: Places): void {
  renderBlock(
    'search-results-block',
    `
    <div class="render-hotell">
      <div class="render-hotell-blok">
        <div class="render-hotell-blok-image">
          <img src="${data.image}" class="image-blok-render-hotell">
          <input type='text' value='Оценка постояльцев: 3.1' disabled class="likes-blok-render-hotell">
        </div>
        <div class="render-hotell-blok-options">
          <ul class="list-options-blok-hotell-render">
            <h3>${data.name}</h3>
            <li>Близость к центру</li>
            <li>Отдельный санузел</li>
            <li>Бесплатный wi-fi</li>
          </ul>
        </div>
        <div class="render-hotell-blok-text">
          <section class="descriptions-text-blok-hotell-render">
            <p class="item-descriptions-text-blok-hotell-render">
              ${data.description}
            </p>
          </section>
        </div>
      </div>
    </div>
    `
  )
}

export function renderSearchResultsBlock(data: Places): void {
  renderBlockSearch(
    'results-list',
    `
      <li class="result">
        <div class="result-container">
          <div class="result-img-container">
          ${
            favoritesActivHTMLElement(getFavoritesAmount(), data.id)
          }
            <img class="result-img" src="${data.image}" alt="">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>${data.name}</p>
              <p class="price">${data.price}</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> 2.5км от вас</div>
            <div class="result-info--descr ">${data.description}</div>
            <div class="result-info--footer">
              <div>
                <button class='bloked' name='cheking' id='/${data.id}'>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
    `
  )
}
