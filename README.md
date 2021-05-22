## Ошибки компиляции
#### 1. ReferenceError: Router is not defined
- **Место** `\controllers\usercontroller.js:1`
- **Описание** Не правильно подключен роутер. Изначально требуется подключить `express`
- **Внесены изменения**
    - Было `var router = Router();`
    - Стало  `var router = require('express').Router();`
    
#### 2. Error: Cannot find module 'bcrypt'
- **Место** `\controllers\usercontroller.js:2`
- **Описание** Не установлен модуль 'bcrypt'
- **Решение** В package.json указан другой пакет `bcryptjs`. Поменял на нужный в импорте
- **Внесены изменения**
   - Было `var bcrypt = require('bcrypt');`
   - Стало  `var bcrypt = require('bcryptjs');`

#### 3. SyntaxError: Function statements require a function name
- **Место** `\models\game.js:1`
- **Описание** Функция не имеет имени, но фактически не экспортирована
- **Внесены изменения**
    - Было `function(sequelize, DataTypes) {`;
    - Стало  `module.exports = function(sequelize, DataTypes) {`
    
#### 4. ReferenceError: routers is not defined
- **Место** `\controllers\gamecontroller.js:116`
- **Описание** Ошибка в имени экспортируемой сущности
- **Внесены изменения**
    - Было `module.exports = routers;`;
    - Стало  `module.exports = router;`

#### 5. TypeError: db.sync is not a function
- **Место** `\app.js:8`
- **Описание** Вызов несуществующей функции. В нашем случае из db ничего не экспортировано
- **Внесены изменения**
    - В файл `\db.js:18` добавлен экспорт `module.exports = sequelize;`

#### 6. TypeError: require(...).import is not a function
- **Место** `\middleware\validate-session.js:2`
- **Описание** Не правильно подключен модуль
- **Внесены изменения**
    - Было `var User = require('sequelize').import('../models/user');`;
    - Стало  `var User = require('../db').import('../models/user');`


### Логические ошибки

#### 1. Unused parameter 'data'
- **Место** `controllers/gamecontroller.js:7`
- **Описание** Полученные данные помещены в переменную, которая далее не используется, при этом используется не корректная переменная в строке `9` этого же файла
- **Внесены изменения**
    - Было `function findSuccess(data) {`;
    - Стало  `function findSuccess(games) {`
    
#### 2. Not defined server port
- **Место** `\app.js:13`
- **Описание** при использовании метода `app.listen` не передан порт прослушки
- **Внесены изменения**
    - Было `app.listen(function () {`;
    - Стало  `app.listen(process.env.DB_PORT || 4000, function () {` - указан порт и номер порта вынесен в переменные среды   


#### 3. body-parser is deprecated
- **Место** `\app.js:9`
- **Описание** конструктор `body-parser` больше не используется. Следует использовать конкретные методы преобазования
- **Внесены изменения**
    - Было `app.use(require('body-parser'));`;
    - Стало `app.use(require('body-parser').json());`
       
     
#### 4. Correct DB port
- **Место** `\db.js:3`
- **Описание** по условию база должна быть размещена на `5433` порту. В опции подключения установлен корректный порт. Вынесен в переменные среды
- **Внесены изменения**
    - Было 
    ```
    {
        host: 'localhost',
        dialect: 'postgres'
    }
  ```
    - Стало  
  ```
  {
      host: 'localhost',
      dialect: 'postgres',
      port: process.env.DB_PORT,
  }
  ```  

#### 5. Not correct object key name
- **Место** `controllers/usercontroller.js:11`
- **Описание** поле объекта `passwordhash` согласно модели должно быть написано в кемелкейс нотации
- **Внесены изменения**
    - Было `passwordhash: bcrypt.hashSync(req.body.user.password, 10),`
    - Стало `passwordHash: bcrypt.hashSync(req.body.user.password, 10),`

#### 6. Not correct reference params
- **Место** `controllers/gamecontroller.js`
- **Строки** 5, 23, 73, 97
- **Описание** Не верно передан параметр id пользователя
- **Внесены изменения** везде где требовалась передача id пользователя строка приведена к корректному виду
    - Было `req.user.id` и `req.user`
    - Стало `req.body.user.id`

### Рефактор кода

- Заменены все `var` на  `const` и `let`
- в `\middleware\validate-session.js:5` добалено строгое сравнение
    - Было `if (req.method == 'OPTIONS') {`
    - Стало `if (req.method !== 'OPTIONS') {`
- в `controllers/gamecontroller.js` функции переписаны на стрелочные.
- в `controllers/gamecontroller.js` обработчик ошибок вынесен в отдельную функцию.
- убрано магическое число из `controllers/usercontroller.js:34`
- исправлено форматирование в соотвествии с правилами линтера
- в Файле `app.js` добавлены `.then` и `.catch` в промис `db.sync()`
