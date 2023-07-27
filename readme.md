<header class='bloch-headers' align="center">

<img src="https://avatars.githubusercontent.com/u/102825678?v=4" alt="Что то пошло не так. Это баннер!" align="center">

<div>
<h1 align="center">Это пробный проект Javascript + Typescript</h1>
<p align="center">Все материалы - картинки и иллюстрации, тексты и т.п. 
<span>использованны для учебных целей, и не имеют цели извлечения материальной выгоды, прибыли и т.п.</span>
<br>
<br>
</p>
<div>
</header>
<br>
<br>
<section align="left">
<div>

<p>

**Тестовое приложение поиска отелей.** Использовалось два SDC, доступых с локального хранилища и запускаемого на удаленном ПК.

</p>

<ul>

**Приложение основанно на двух SDC:**

<li>
flat-rent-sdk - локальное хранилище отелей;
</li>
<li>
Класс ConcatListHotel, используется приватный метод handlePromis.
</li>
</ul>

</div>
<br>
<br>

<hr>
<p>

**Для работы с удаленным SDC** - требуется сам SDC.

<br>

**Локальный SDC присутствует в репозитории**
</p>
<p>
<br>
</p>
<hr>
</section>


<section>
<div>
<p>

**Cейчас** 
Необходимо изменить часть frontend страниц. Именно метод addeventlistener, сейчас слудит за нажатием кнопки мыши. Позже необходимо сделать по событию submit.
<br>
</p>
<div>
<p>

```javascript
// Например файл index.ts

(<HTMLElement>document.querySelector('.uped')).addEventListener('click', (event: MouseEvent) =>{
    (<MouseEvent>event).preventDefault()
    if((<HTMLElement>event.target).className == 'button-search'){
       generateClassValidation(true);
    }
  }); 
```

</p>
<div>
</div>
</section>

<br><br>
<section>
<h2>



**Запуск**

</h2>
<hr>

<ul>
<li>

**Скачиваем репозиторий:** git@github.com:ilias222/test-readi.git

</li>
<li>

**Устанавливаем node mudule:** ``npm install``

</li>
<li>

**Запускаем:** ``npm run start``

</li>
</ul>
