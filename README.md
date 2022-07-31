![Tests for sprint 13](https://github.com/Evgeta/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/Evgeta/express-mesto-gha/actions/workflows/tests-13-sprint.yml) [![Tests for sprint 14](https://github.com/Evgeta/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/Evgeta/express-mesto-gha/actions/workflows/tests-14-sprint.yml)


# Проект: Учебный проект Яндекс.Практикума. Спринт 14. Проект Mesto. Серверная часть. 

### Обзор
* Описание проекта
* Технологии

**Описание проекта**

 В проекте представлениа серверная часть для работы Mesto.

 В проекте предусмотрена функциоональность:
  * Запрос информации о пользователе
  * Обновлние профиля пользователя
  * Обновление аватара пользователя
  * Запрос всех пользователей
  * Создание карточки
  * Завпрос всех карточек
  * Выставление лайка карточки
  * Удаление лайка
  * Удаление карточки по иднтификатору
  * Авторизация и регистрация пользователя
  * Получение информации о польщователе
  * Проверка данных на уровне схемы MongoDB
  * Валидация данных, приходящих на сервер
  * Централизованная обработка ошибок

**Технологии**

* express
* MongoDB

Чеклист по проекту [Чеклист](https://code.s3.yandex.net/web-developer/checklists-pdf/new-program/checklist_14.pdf)

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
