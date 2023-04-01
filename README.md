# Web messenger [![Netlify Status](https://api.netlify.com/api/v1/badges/54acb51b-5193-4074-9663-d4e6658c880c/deploy-status)](https://app.netlify.com/sites/legendary-kashata-460bb6/deploys)

**Это учебный проект курса "Middle frontend разработчик" от Яндекс.практикум**

## Команды проекта
### Запуск в режиме разработчика
```
npm run dev
```

### Запуск локального сервера
```
npm run start
```

### Запуск продуктовой сборки проекта
```
npm run build
```

## Ссылки проекта

[Макет](https://www.figma.com/file/HbxCUDgmlXcHRv4eewUSBw/Messanger?node-id=0%3A1&t=FbrKM9oKM4RK6Pmu-1)

[Развернутый проект](https://legendary-kashata-460bb6.netlify.app/)

В проекте используется TypeScript, SCSS, ESLit, Stylelint, Handlebars. 

Проект построен по принципу компонентного подхода. 
Все компоненты наследуются от класса Block, имеют реактивные свойства и шину событий. 
Шаблонизацию отображения переданных свойств обеспечивает шаблонизатор Handlebars.

Чтобы перемещаться по страницам в некоторых случаях придется вводить адрес в адресную строку.  
Такие страницы помечены двойными звездочками **  

Список всех путей:

/ - авторизация  
/registration - регистрация  
/chats - страница со списком чатов **  
/chat-item - страница со списком чатов и открытым чатом
/profile - страница профиля  
/edit-profile - редактирование профиля  
/change-password - смена пароля  
/error-404 - страница ошибки 404 ** 
/error-500 - страница 5хх ошибок ** 
