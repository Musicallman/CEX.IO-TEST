# TEST
TEST Back-End dev

Инструкция:
1. Скачать репозиторий.
2. Скачать все необходимые модули с помощью команды npm i
3. Запустить приложение с помощью команды node cexioApp.js

Нужно сделать консольное nodejs приложение:
Функциональные требования:
1. Получать текущую цену биткоина в долларах через REST с сайта coinmarketcap. Описание API - https://coinmarketcap.com/api/
1.1 Хранить эту цену в приложении, и каждые 10 секунд обновлять через API.
2. Постоянно получать (то есть, подписываться) текущую цену биткоина в долларах через WebSocket с сайта cexio. Описание API - https://cex.io/websocket-api#ticker-subscription
3. При каждом изменении цены на сайте cexio, считать разницу в цене между ценой с сайта cexio и ценой с сайта coinmarketcap. Разницу считать в процентах - насколько процентов цена на сайте cex больше, чем цена на сайте coinmarketcap. Число может быть и положительным и отрицательным.
3.1 У числа должно быть 4 знака после запятой, даже если число целое. Если у числа больше знаков после запятой, то нужно округлить число до 4-х знаков после запятой. 
4. При каждом изменении разницы (посчитанной в пункте 3) выводить в консоль текущее время в UTC в любом формате и новое значение разницы (посчитанной в пункте 3).
4.1 Нужно выводить новое значение только в случае, если оно отличается от предыдущего. То есть, не надо выводить в консоль несколько подряд одинаковых строк, выводить нужно только в случае если они отличаются.

Не функциональные требования:
А. Программа должна быть модульной. То есть, программа должна быть написана таким образом, чтобы к примеру в будущем в пункте 1 легко можно было заменить реализацию для подключения к другому сайту
Б. Программа должна быть тестируемой. То есть, программа должна быть написана таким образом, чтобы для большинства её функциональности можно было написать юнит-тесты. Нужно написать юнит-тесты на mocha и покрыть основные части программы (в идеале покрыть тестами нужно весь код).
В. Программа должна быть конфигурируемой. То есть, нужно чтобы был файл, отдельный от самого кода программы, который содержит:
В.1 Период обновления цены с первого сайта (пункт 1.1). По умолчанию обновление каждые 10 секунд.
В.2 Количество знаков после запятой (пункт 3.1). По умолчанию - 4 знака после запятой
В.3 Формат времени для вывода в консоль (пункт 4). По умолчанию формат - число из двух цифр количества пройденных минут в текущем часе, разделитель двоеточие “:”, и число из двух цифр количества пройденных секунд в текущей минуте.  
