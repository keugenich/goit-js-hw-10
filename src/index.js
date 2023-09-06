import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

new SlimSelect({
    select: '#selectElement'
})

const elements = {
    selectEl: document.querySelector('.breed-select'),
    textMarkEl: document.querySelector('.cat-info'),
    loaderEl: document.querySelector('.loader'),
    errorEl: document.querySelector('.error'),
};

const { selectEl, textMarkEl, loaderEl, errorEl } = elements;

textMarkEl.classList.add('is-hidden');

// Оновлена функція для ініціалізації селектора SlimSelect
function initializeSelect(data) {
    loaderEl.classList.replace('loader', 'is-hidden');
    errorEl.classList.add('is-hidden');
    textMarkEl.classList.add('is-hidden');

    const markSelect = data.map(({ name, id }) => {
        return `<option value="${id}">${name}</option>`;
    });

    selectEl.innerHTML = markSelect.join('');
    new SlimSelect({
        select: selectEl,
    });
    selectEl.addEventListener('change', createMarkUp); // Додаємо обробник події на селектор
}

updateSelect();

function updateSelect(data) {
    fetchBreeds(data)
        .then(data => {
            initializeSelect(data); // Ініціалізуємо селектор з даними
        })
        .catch(onFetchError);
}

function createMarkUp(event) {
    loaderEl.classList.replace('is-hidden', 'loader');
    selectEl.classList.add('is-hidden');
    textMarkEl.classList.add('is-hidden');

    const breedId = event.currentTarget.value;

    fetchCatByBreed(breedId)
        .then(data => {
            loaderEl.classList.replace('loader', 'is-hidden');
            selectEl.classList.remove('is-hidden');
            const { url, breeds } = data[0];

            textMarkEl.innerHTML = `<img src="${url}" alt="${breeds[0].name}" width="400"/><div class="box"><h2>${breeds[0].name}</h2><p>${breeds[0].description}</p><p><strong>Temperament:</strong> ${breeds[0].temperament}</p></div>`;
            textMarkEl.classList.remove('is-hidden');
        })
        .catch(onFetchError);
}

function onFetchError(error) {
    loaderEl.classList.replace('loader', 'is-hidden');
    selectEl.classList.remove('is-hidden');

    Notify.failure(
        `Oops! Something went wrong: ${error.message}. Try reloading the page or select another cat breed!`
    );
}
