## Ошибки компиляции
#### 1. ReferenceError: Router is not defined
- **Место** `\controllers\usercontroller.js:1`
- **Описание** Не правильно подключен роутер. Изначально требуется подключить `express`

- **Внесены изменения**
    - Было `var router = Router();`
    - Стало  `var router = require('express').Router();`
    
#### 2. Error: Cannot find module 'bcrypt'
- **Описание** Не установлен модуль 'bcrypt'

- **Внесены изменения**
    - установил моудль командой `npm i -S bcrypt`

#### 3. SyntaxError: Function statements require a function name
- **Место** `\models\game.js:1`
- **Описание** Функция не имеет имени, но фактически не экспортирована
- **Внесены изменения**
    - Было `function(sequelize, DataTypes) {`;
    - Стало  `module.exports = function(sequelize, DataTypes) {`
    
#### 4. ReferenceError: routers is not defined
- **Место** `\controllers\gamecontroller.js:112`
- **Описание** Ошибка в имени экспортируемой сущности
- **Внесены изменения**
    - Было `module.exports = routers;`;
    - Стало  `module.exports = router;`

#### 5. TypeError: db.sync is not a function
- **Место** `\app.js:7`
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

#### 7. Unused parameter 'data'
- **Место** `controllers/gamecontroller.js:6`
- **Описание** Полученные данные помещены в переменную, которая далее не используется, при этом используется не корректная переменная в строке `8` этого же файла
- **Внесены изменения**
    - Было `function findSuccess(data) {`;
    - Стало  `function findSuccess(games) {`
    
#### 8. Not defined server port
- **Место** `\app.js:17` строка не совпадает с оригиналом, добавлены строки
- **Описание** при использовании метода `app.listen` не передан порт прослушки
- **Внесены изменения**
    - Было `app.listen(function () {`;
    - Стало  `app.listen(process.env.DB_PORT || 4000, function () {` - указан порт и номер порта вынесен в переменные среды   


#### 9. body-parser is deprecated
- **Место** `\app.js:10` строка не совпадает с оригиналом, добавлены строки
- **Описание** конструктор `body-parser` больше не используется. Следует использовать конкретные методы преобазования
- **Внесены изменения**
    - Было `app.use(bodyParser);`;
    - Стало  
        ```
        app.use(bodyParser.urlencoded());
        app.use(bodyParser.json());
        ```
   - Также добавил подключение модуля в начале файла 
        ```
        const bodyParser = require('body-parser');
        ```



### Рефактор кода

- Заменены все `var` на  `const` и `let`
- в `\middleware\validate-session.js:5` добалено строгое сравнение
    - Было `if (req.method == 'OPTIONS') {`
    - Стало `if (req.method === 'OPTIONS') {`
