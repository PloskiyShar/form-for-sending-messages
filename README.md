Форма с текстовым полем для ввода сообщения.

Снизу отображается количество введенных символов и колличество сообщений, необходимых для отправки этого текста.
Также присутствует чекбокс, при нажатии на который, все кириллические символы транслитерируются в латинские аналоги.
При нажатии на кнопку "Отправить", поле ввода очищается, а колличество сообщений и текст сохраняются в БД (имитацию БД this.dataBase).
Основной код находится в ./src/App.js, вспомогательные функции в ./src/healpers.js.
Если вы захотите протестировать код в браузере, то не забудьте загрузить node_modules введя в консоли npm install .
Для запуска локального сервера наберите в консоли npm run start.
