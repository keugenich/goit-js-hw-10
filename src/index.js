import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elements = {
    selectEl: document.querySelector('.breed-select'),
    textMarkEl: document.querySelector('.cat-info'),
    loaderEl: document.querySelector('.loader'),
    errorEl: document.querySelector('.error'),
};

const { selectEl, textMarkEl, loaderEl, errorEl } = elements;

// Початковий стан: сховати лоадер і помилку
selectEl.style.display = 'none';
loaderEl.style.display = 'none';
errorEl.style.display = 'none';

selectEl.addEventListener('change', createMarkUp);

updateSelect();

function updateSelect(data) {
    loaderEl.style.display = 'none'; // Приховуємо лоадер перед завантаженням
    selectEl.style.display = 'block'; // Відображаємо select перед завантаженням

    fetchBreeds(data)
        .then(data => {
            loaderEl.style.display = 'block'; // Відображаємо лоадер після завантаження
            selectEl.style.display = 'none'; // Приховуємо select перед оновленням

            let markSelect = data.map(({ name, id }) => {
                return `<option value ='${id}'>${name}</option>`;
            });
            selectEl.innerHTML = markSelect.join('');
            new SlimSelect({
                select: selectEl,
            });
            loaderEl.style.display = 'none'; // Приховуємо лоадер після оновлення
            selectEl.style.display = 'block'; // Відображаємо select після оновлення
        })
        .catch(onFetchError);
}

function createMarkUp(event) {
    loaderEl.style.display = 'block'; // Відображаємо лоадер перед завантаженням
    selectEl.style.display = 'none'; // Приховуємо select перед завантаженням
    textMarkEl.style.display = 'none';

    const breedId = event.currentTarget.value;

    fetchCatByBreed(breedId)
        .then(data => {
            loaderEl.style.display = 'none'; // Приховуємо лоадер після завантаження
            selectEl.style.display = 'block'; // Відображаємо select після завантаження
            const { url, breeds } = data[0];

            textMarkEl.innerHTML = `<img src="${url}" alt="${breeds[0].name}" width="400"/><div class="box"><h2>${breeds[0].name}</h2><p>${breeds[0].description}</p><p><strong>Temperament:</strong> ${breeds[0].temperament}</p></div>`;
            textMarkEl.style.display = 'block';
        })
        .catch(onFetchError);
}

function onFetchError() {
    loaderEl.style.display = 'none'; // Приховуємо лоадер після завантаження
    selectEl.style.display = 'block'; // Відображаємо select після завантаження

    Notify.failure(
        'Oops! Something went wrong! Try reloading the page or select another cat breed!'
    );
}
