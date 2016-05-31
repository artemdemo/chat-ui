[Русская версия](https://github.com/artemdemo/chat-ui/blob/master/readme-ru.md)

# Chat UI

Module for Chat UI representation

![alt tag](https://github.com/artemdemo/chat-ui/blob/master/img/chat-themes.png)

### Technologies

* ES6
* Babel
* Webpack
* Gulp
* Less

### Getting started

You can use Chat UI as module:

```javascript
import ChatUI from './vendor/chat-ui';
```

or use it as stand alone file in your project: 

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

**Initialization**

```javascript
var chat = ChatUI(settings).render(tagId);
```

* `settings` - settings object of chat properties
* `tagId` - id of tag, where chat will be rendered

**Chat settings**

* `title` - chat title or name of the consultant
* `subtitle` - position or consultant description
* `avatar` - avatar image of the consultant - string or boolean
* `sendText` - text for "send" button in chat window
* `inputPlaceholder` - placeholder text on the input
* `isTyping` - message that operator is typing
* `sanitizeOptions` - updated sanitize options. I'm using [sanitize-html](https://www.npmjs.com/package/sanitize-html)

Default settings:

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

### Events

Your interaction with chat will be via different events
 
**.trigger(eventName)**

Open chat window

```javascript
chat.trigger('open-chat');
```

Show message in chat dialog list

```javascript
// There is number of options for message
// It can be string:
// var message = 'Hello!';
// Simple object:
// var message = {message:'Hello'};
// Full object, where you can decide on which side text will appear: 'user' or 'chat'
// var message = {side: 'chat', message:'Hello'};
chat.trigger('add-phrase', message);
```

Close chat window

```javascript
chat.trigger('close-chat');
```

Clear dialog list

```javascript
chat.trigger('clear-dialog');
```

Show "typing" icon to the user

```javascript
chat.trigger('is-typing');
```

**.on(eventName)**

User send message callback

```javascript
chat.on('user-send-message', function(message) {
    // ...
});
```

Chat closed callback

```javascript
chat.on('chat-closed', function(data) {
    console.log('chat-closed', data);
});
```

### Developing

Watch function for all files

```bash
$ npm run watch
```

Build regular and minified versions of the library files.

```bash
$ npm run build
```

### Code quality

* eslint, based on airbnb specs

### Testing

* Mocha [npm:mocha](https://www.npmjs.com/package/mocha)
* jsdom [npm:jsdom](https://www.npmjs.com/package/jsdom)

### Libraries

* EventEmitter - evented JavaScript for the browser [github:wolfy87-eventemitter](https://github.com/Olical/EventEmitter), [npm:wolfy87-eventemitter](https://www.npmjs.com/package/wolfy87-eventemitter)
* sanitize-html - Clean up user-submitted HTML, preserving whitelisted elements and whitelisted attributes on a per-element basis,
[npm:sanitize-html](https://www.npmjs.com/package/sanitize-html)
