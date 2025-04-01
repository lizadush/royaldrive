 // Получаем все кнопки и модальные окна
        var modalButtons = document.querySelectorAll('[id^="openModal"]');
        var modals = document.querySelectorAll(".modal");
        var spans = document.getElementsByClassName("close");
        var orderForm = document.getElementById("orderForm");
        var openModalButton = document.getElementById("openModal");

        // Функция для проверки обязательных полей
        function checkFormValidity() {
          let isValid = true;
      
          // Проверка поля с адресом
          const addressInput = document.getElementById("addressInput");
          if (!validateAddressFormat()) {
              isValid = false;
          }
      
          // Проверка поля с email
          const emailInput = document.getElementById("emailInput");
          const emailValue = emailInput.value;
          if (emailValue.length === 0 || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(emailValue)) {
              isValid = false;
              alert("Введите корректный адрес электронной почты.");
          }
      
          // Проверка поля с датой
          const dateInput = document.getElementById("dateInput");
          const dateValue = dateInput.value;
          if (dateValue.length === 0 || !/^d{4}-d{2}-d{2}$/.test(dateValue)) { // Пример формата: YYYY-MM-DD
              isValid = false;
              alert("Введите корректную дату в формате YYYY-MM-DD.");
          }
      
          // Проверка других полей формы на наличие букв кириллицы
          const otherInput = document.getElementById("otherInput"); // замените на актуальный ID вашего поля
          if (otherInput.value.length > 0 && !/^[А-Яа-яЁёs-]+$/.test(otherInput.value)) {
              isValid = false;
              alert("Введите корректные данные (только кириллица).");
          }
      
          // Деактивируем или активируем кнопку в зависимости от результата проверки
          openModalButton.disabled = !isValid;
      
          return isValid;
      }

        // Проверка полей формы при вводе
        orderForm.addEventListener('input', checkFormValidity);

        // Функция для открытия модального окна
        modalButtons.forEach(function (button, index) {
            button.onclick = function () {
                modals[index].style.display = "block";
                orderForm.reset(); // Очищаем форму
                openModalButton.disabled = true; // Деактивируем кнопку после оформления
                checkFormValidity(); // Проверяем валидность формы
            };
        });

        // Закрытие модального окна по кнопке "закрыть"
        for (let i = 0; i < spans.length; i++) {
            spans[i].onclick = function () {
                modals[i].style.display = "none";
            };
        }

        // Закрытие модального окна по клику вне
        window.onclick = function (event) {
            modals.forEach(function (modal) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            });
        };

        // Обработка отправки формы
        orderForm.onsubmit = function (event) {
            event.preventDefault(); // Предотвращаем стандартное поведение формы

            if (orderForm.checkValidity()) {
                modals[0].style.display = "block"; // Открываем модальное окно
                orderForm.reset(); // Очищаем форму
             openModalButton.disabled = true; // Деактивируем кнопку после оформления
                checkFormValidity(); // Проверяем валидность формы
            } else {
                alert("Пожалуйста, заполните все обязательные поля корректно.");
            }
        };
