import { renderBlock } from './lib.js'

// Вывод блока пользователя, разметка аватара и количества избранных

export function renderUserBlock (nameUser?: unknown, avatarURL?: unknown, favoriteItemsAmount?:unknown):any {
  const favoritesCaption = favoriteItemsAmount ? favoriteItemsAmount : 'ничего нет'
  const hasFavoriteItems = favoriteItemsAmount ? true : false

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="${avatarURL}" alt="Wade Warren" />
      <div class="info">
          <p class="name">${nameUser}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}">
            <span class="cell-favorites" style="margin: 20px;">${favoritesCaption}</span></i>
          </p>
      </div>
    </div>
    `
  )
}
