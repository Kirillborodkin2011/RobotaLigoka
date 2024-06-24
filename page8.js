document.addEventListener('DOMContentLoaded', function() {
    const icon = document.querySelector('.icon');
    const search = document.querySelector('.search');
    const input = document.querySelector('#mySearch');
    const dishes = document.querySelectorAll('.syp');

    icon.onclick = function() {
        search.classList.toggle('active');
    };

    input.addEventListener('input', function() {
        const filter = input.value.trim().toLowerCase();
        dishes.forEach(function(dish) {
            const text = dish.querySelector('p').textContent.trim().toLowerCase();
            if (text.includes(filter)) {
                dish.style.display = 'block';
            } else {
                dish.style.display = 'none';
            }
        });
    });

    const modal = document.getElementById('myModal');
    const btn = document.getElementById('openModalBtn');
    const span = document.getElementsByClassName('close')[0];
    const uploadForm = document.getElementById('uploadForm');
    const imageInput = document.getElementById('imageInput');
    const dishNameInput = document.getElementById('dishName');
    const mainContainer = document.querySelector('.contanier-main');

    btn.onclick = function() {
        modal.style.display = 'block';
        icon.style.display = 'none'; // Скрыть иконку поиска при открытии модального окна
    };

    span.onclick = function() {
        modal.style.display = 'none';
        icon.style.display = 'block'; // Показать иконку поиска при закрытии модального окна
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            icon.style.display = 'block'; // Показать иконку поиска при клике вне модального окна
        }
    };

    uploadForm.onsubmit = function(event) {
        event.preventDefault();

        const file = imageInput.files[0];
        const dishName = dishNameInput.value.trim();

        if (file && dishName) {
            const reader = new FileReader();

            reader.onload = function(e) {
                const newDish = document.createElement('div');
                newDish.classList.add('syp');

                const img = document.createElement('img');
                img.src = e.target.result;
                img.classList.add('tykva');

                const name = document.createElement('p');
                name.textContent = dishName;
                name.classList.add('tykv');

                const link = document.createElement('a');
                link.href = '#';
                link.textContent = 'Подробнее';
                link.classList.add('button');
                link.onclick = function() {
                    // Дополнительная логика для кнопки "Подробнее", если необходимо
                };

                newDish.appendChild(img);
                newDish.appendChild(name);
                newDish.appendChild(link);

                // Вставляем новый блок перед кнопкой "Добавить"
                mainContainer.insertBefore(newDish, mainContainer.lastElementChild);

                // Очищаем форму после загрузки
                imageInput.value = '';
                dishNameInput.value = '';

                // Закрываем модальное окно
                modal.style.display = 'none';
                icon.style.display = 'block'; // Показываем иконку поиска
            };

            reader.readAsDataURL(file);
        }
    };
});
