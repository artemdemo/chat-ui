[English version](https://github.com/artemdemo/chat-ui/blob/master/readme.md)

# Chat UI

Модуль для отображения чат интерфейса

![alt tag](https://github.com/artemdemo/chat-ui/blob/master/img/chat-themes.png)

### Технологии

* ES6
* Babel
* Webpack
* Gulp
* Less

### Базовое использвание

Можно подключить чат в качестве модуля:

```javascript
import ChatUI from './vendor/chat-ui';
```

или использовать как отдельный файл:

```html
<script src="../lib/chat-ui.js"></script>
<link href="../lib/chat-ui.css" rel="stylesheet" media="all" />
```

```javascript
$(document).ready(function() {

    var chat = ChatUI({
        title: 'John Doe',
        avatar: './john-doe.jpg',
        subtitle: 'consultant'
    }).render('#chat');
    
});
```

**Инициализация**

```javascript
var chat = ChatUI(settings).render(tagId);
```

* `settings` - объект с настройками для чата
* `tagId` - id тега, в котором будет отрендерин чат

**Настройки чата**

* `title` - заголовок чата или имя консультанта
* `subtitle` - должность, либо описание
* `avatar` - аватар консультанта - string или boolean
* `sendText` - текст кнопки "send" в окне чата
* `inputPlaceholder` - placeholder text on the input
* `isTyping` - текст (или html) сообщение, о том, что оператор печатает 
* `sanitizeOptions` - настройки для санитизации сообщения. Я использую [sanitize-html](https://www.npmjs.com/package/sanitize-html)

Настройки по-умолчанию:

```javascript
let settings = {
    title: 'John Doe',
    subtitle: 'consultant',
    avatar: false,
    sendText: 'Send',
    inputPlaceholder: 'Enter your message',
    isTyping: `
        <div class="${LIB_NAME}-dots-loading">
            <span class="dots-loading__dot">&#8226;</span>
            <span class="dots-loading__dot">&#8226;</span>
            <span class="dots-loading__dot">&#8226;</span>
        </div>
    `,
    sanitizeOptions: {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        allowedAttributes: {
            a: sanitizeHtml.defaults.allowedAttributes.a,
            img: sanitizeHtml.defaults.allowedAttributes.img.concat(['class']),
            div: ['class']
        }
    }
}
```

### События

Интеракция с чатом проходит путем исопльзование событий 

**.trigger(eventName)**

Открыть окно чата

```javascript
chat.trigger('open-chat');
```

Отобразить сообщение в списке диалога чата

```javascript
// Есть несколько способов передат сообщение
// Это может быть строка:
// var message = 'Hello!';
// Простой объект:
// var message = {message:'Hello'};
// Комплексный объект, в котором можно указать на какой стороне должно появиться сообщение: 'user' или 'chat'
// var message = {side: 'chat', message:'Hello'};
chat.trigger('add-phrase', message);
```

Закрыть окно чата

```javascript
chat.trigger('close-chat');
```

Очистить окно чата

```javascript
chat.trigger('clear-dialog');
```

Показать "typing" иконку пользователю

```javascript
chat.trigger('is-typing');
```

**.on(eventName)**

Колбек, вызываемый после того как пользователь отправил сообщение 

```javascript
chat.on('user-send-message', function(message) {
    // ...
});
```

Колбек о том что чат закрылся

```javascript
chat.on('chat-closed', function(data) {
    console.log('chat-closed', data);
});
```

### Разработка

Компиляция кода по каждому изменению в реальном времени

```bash
$ npm run watch
```

Собираем обычную и минифаенную версию всех файлов библиотеки

```bash
$ npm run build
```

### Качество кода

* eslint, based on airbnb specs

### Тестирование

* Mocha [npm:mocha](https://www.npmjs.com/package/mocha)
* jsdom [npm:jsdom](https://www.npmjs.com/package/jsdom)

### Библиотеки

* Bean - an events api library [github:bean](https://github.com/fat/bean), [npm:bean](https://www.npmjs.com/package/bean)
* sanitize-html - Clean up user-submitted HTML, preserving whitelisted elements and whitelisted attributes on a per-element basis,
[npm:sanitize-html](https://www.npmjs.com/package/sanitize-html)
