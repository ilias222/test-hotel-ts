import { renderBlock } from './lib.js'
import { getData } from './generateDate.js';

// Вывод формы фильтра отелей, по дате и цене

export function renderSearchFormBlock () {
  renderBlock(
    'search-form-block',
    `
    <form class='uped'>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <div class="providers">
            <label><input type="checkbox" name="provider" id="homy" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" id="flat-rent" value="flat-rent" checked /> FlatRent</label>
          </div>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${getData('value')}" min="${getData('min')}" max="${getData('max')}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${getData('value')}" min="${getData('min')}" max="${getData('max')}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button class="button-search">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
}
