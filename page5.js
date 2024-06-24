// Иконка поиска
const icon = document.querySelector('.icon');
const search = document.querySelector('.search');
const input = document.querySelector('#mySearch');
const soups = document.querySelectorAll('.syp');

icon.onclick = function() {
    search.classList.toggle('active');
};

input.addEventListener('input', function() {
    const filter = input.value.toLowerCase();
    soups.forEach(function(soup) {
        const text = soup.textContent.toLowerCase();
        if (text.includes(filter)) {
            soup.style.display = 'block';
        } else {
            soup.style.display = 'none';
        }
    });
});

// Модальное окно
const modal = document.getElementById('myModal');
const btn = document.getElementById('openModalBtn');
const span = document.getElementsByClassName('close')[0];
const uploadForm = document.getElementById('uploadForm');
const imageInput = document.getElementById('imageInput');
const dishNameInput = document.getElementById('dishName');
const output = document.getElementById('output');
const mainContainer = document.querySelector('.contanier-main');

btn.onclick = function() {
    modal.style.display = 'block';
    icon.style.display = 'none';  // Скрыть иконку поиска
};

span.onclick = function() {
    modal.style.display = 'none';
    icon.style.display = 'block';  // Показать иконку поиска
};

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        icon.style.display = 'block';  // Показать иконку поиска
    }
};

uploadForm.onsubmit = function(event) {
    event.preventDefault();
    
    const file = imageInput.files[0];
    const dishName = dishNameInput.value;
    
    if (file && dishName) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Создание нового блока для главной страницы
            const newSoup = document.createElement('div');
            newSoup.classList.add('syp');
            
            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add('tykva'); // добавляем класс для стилей
            
            const name = document.createElement('p');
            name.textContent = dishName;
            name.classList.add('tykv'); // добавляем класс для стилей
            
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = 'Подробнее';
            link.classList.add('button');
            link.onclick = function() {
                // Здесь можно добавить логику для кнопки "Подробнее" по вашему желанию
                // addToCart(dishName, 0); // Пример: добавление в корзину
            };
            
            newSoup.appendChild(img);
            newSoup.appendChild(name);
            newSoup.appendChild(link);
            
            // Добавление нового блока перед блоком с кнопкой "Добавить"
            mainContainer.insertBefore(newSoup, mainContainer.lastElementChild);
            
            // Очистка формы
            imageInput.value = '';
            dishNameInput.value = '';
            
            // Закрытие модального окна
            modal.style.display = 'none';
            icon.style.display = 'block';  // Показать иконку поиска
        };
        
        reader.readAsDataURL(file);
    }
};
