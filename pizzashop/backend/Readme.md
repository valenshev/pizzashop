## Команды для работы с миграциями

npx sequelize-cli migration:generate --name create-sizes - создать миграцию, которая будет создавать в базе данных таблицу
npx sequelize-cli db:migrate - запустить все миграции

## Какой порядок миграций должен быть

- sizes
- categories
- ingredients
- pizzas
- users
- delivery_types
- order_statuses
- orders

## Команды для работы с сидерами

npx sequelize-cli seed:generate --name demo-data -- генерирует сидер
npx sequelize-cli db:seed:all -- засеивает БД

## OP Sequelize
Op.eq =
Op.ne !=
Op.gt / gte / lt / lte > >= < <=
Op.in IN
Op.like LIKE
Op.iLike iLike -- postgres
Op.and AND
Op.or = OR
Op.is = IS NULL