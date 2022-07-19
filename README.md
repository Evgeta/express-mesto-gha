<!-- [![Tests](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-13-sprint.yml) [![Tests](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-14-sprint.yml) -->

[![Tests for sprint 13](https://github.com/Evgeta/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/Evgeta/express-mesto-gha/actions/workflows/tests-13-sprint.yml) 

[![Tests for sprint 14](https://github.com/Evgeta/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/Evgeta/express-mesto-gha/actions/workflows/tests-14-sprint.yml)

# Проект Mesto фронтенд + бэкенд



## Настройка бейджей статуса тестов
Перед началом работы над проектом рекомендуется исправить бейджи, отражающие статус прохождения тестов.
Для этого замените разметку бейджей на следующий фрагмент, подставив вместо `${имя_пользователя}` и `${имя_репозитория}` соответствующие значения.

```
[![Tests for sprint 13](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-13-sprint.yml) 

[![Tests for sprint 14](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-14-sprint.yml)
```

# Проект: Учебный проект Яндекс.Практикума. Спринт 13. Проект Mesto. Скрерная часть. 

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

**Технологии**

* express
* MongoDB

Чеклист по проекту [Чеклист](https://code.s3.yandex.net/web-developer/checklists/new-program/checklist-13/index.html)

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  


## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
