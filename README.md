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

#### 3. TypeError: require(...).import is not a function
- **Место** `\controllers\usercontroller.js:5`
- **Описание** Не правильно подключен модуль
- **Внесены изменения**
    - Было `var User = require('../db').import('../models/user')`;
    - Стало  `var User = require('../models/user');`

#### 4. TypeError: require(...).import is not a function
- **Место** `\controllers\gamecontroller.js:2`
- **Описание** Не правильно подключен модуль
- **Внесены изменения**
    - Было `var Game = require('../db').import('../models/game');`;
    - Стало  `var Game = require('../models/game');`

#### 5. SyntaxError: Function statements require a function name
- **Место** `\models\game.js:1`
- **Описание** Функция не имеет имени, но фактически не экспортирована
- **Внесены изменения**
    - Было `function(sequelize, DataTypes) {`;
    - Стало  `module.exports = function(sequelize, DataTypes) {`
    
#### 6. ReferenceError: routers is not defined
- **Место** `\controllers\gamecontroller.js:112`
- **Описание** Ошибка в имени экспортируемой сущности
- **Внесены изменения**
    - Было `module.exports = routers;`;
    - Стало  `module.exports = router;`

#### 7. TypeError: db.sync is not a function
- **Место** `\app.js:7`
- **Описание** Вызов несуществующей функции. В нашем случае из db ничего не экспортировано
- **Внесены изменения**
    - В файл `\db.js:18` добавлен экспорт `module.exports = sequelize;`

#### 8. TypeError: require(...).import is not a function
- **Место** `\middleware\validate-session.js:2`
- **Описание** Не правильно подключен модуль
- **Внесены изменения**
    - Было `var User = require('sequelize').import('../models/user');`;
    - Стало  `var User = require('../models/user');`


### Логические ошибки

#### 9. Unused parameter 'data'
- **Место** `controllers/gamecontroller.js:6`
- **Описание** Полученные данные помещены в переменную, которая далее не используется, при этом используется не корректная переменная в строке `8` этого же файла
- **Внесены изменения**
    - Было `function findSuccess(data) {`;
    - Стало  `function findSuccess(games) {`
