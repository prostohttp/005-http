# Домашнее задание к занятию «1.5. Http module. Переменные окружения»

#### Задание 1
Ознакомиться с документацией [API-сервиса weatherstack](https://weatherstack.com/documentation).

Зарегистрироваться, выбрав [**Free**](https://weatherstack.com/signup/free) (бесплатный) тарифный план, чтобы получить токен для доступа к API.

#### Задание 2
На основе модуля **http** написать консольное приложение для динамической загрузки данных с [API](https://weatherstack.com/) погоды из *задания 1*.

В качестве входных параметров клиент должен принимать название города, для которого требуется вывести прогноз.

Токен для доступа к [API](https://weatherstack.com/) обязательно должен храниться в переменных окружения **env**.

Создайте в проекте конфигурационный файл `config.js` и разместите в нём дефолтные значения всех переменных окружения, используемых при решении задачи. В поле для сдачи работы, помимо ссылки на ваш проект в Git, прикрепите файл `config.js`.