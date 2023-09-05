import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";

axios.defaults.headers.common["x-api-key"] = "live_8dbmcwczl2BD780JhZKJEyUt601F1OUO2LkZtyy3jHlhgPRNBH3MoyPJxbjfHCAB";

const breedSelect = document.querySelector(".breed-select");
const catInfoDiv = document.querySelector(".cat-info");

// Функція для встановлення стану завантаження
function setLoadingState(isLoading) {
    if (isLoading) {
        // Показати loader та сховати select або cat-info
        breedSelect.classList.add("loading");
        catInfoDiv.classList.add("loading");
    } else {
        // Сховати loader та показати select або cat-info
        breedSelect.classList.remove("loading");
        catInfoDiv.classList.remove("loading");
    }
}

// Функція для встановлення стану помилки
function setErrorState(hasError) {
    if (hasError) {
        // Показати елемент з помилкою
        document.body.classList.add("has-error");
    } else {
        // Сховати елемент з помилкою
        document.body.classList.remove("has-error");
    }
}

// Отримуємо список порід та заповнюємо select
function populateBreeds() {
    setLoadingState(true); // Перед HTTP-запитом
    setErrorState(false); // Сховати помилку перед HTTP-запитом
    fetchBreeds()
        .then(breeds => {
            setLoadingState(false); // Після завершення HTTP-запиту
            breeds.forEach(breed => {
                const option = document.createElement("option");
                option.value = breed.id;
                option.text = breed.name;
                breedSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error(error);
            setLoadingState(false); // Після завершення HTTP-запиту з помилкою
            setErrorState(true); // Показати помилку
        });
}

// Обробник події для вибору опції в селекті
breedSelect.addEventListener("change", () => {
    const selectedBreedId = breedSelect.value;
    if (selectedBreedId) {
        setLoadingState(true); // Перед HTTP-запитом
        setErrorState(false); // Сховати помилку перед HTTP-запитом
        fetchCatByBreed(selectedBreedId)
            .then(catData => {
                setLoadingState(false); // Після завершення HTTP-запиту
                // Відображаємо інформацію про кота
                catInfoDiv.innerHTML = `
          <img src="${catData.imageUrl}" alt="${catData.breedName}">
          <h2>${catData.breedName}</h2>
          <p><strong>Опис:</strong> ${catData.description}</p>
          <p><strong>Темперамент:</strong> ${catData.temperament}</p>
        `;
            })
            .catch(error => {
                console.error(error);
                setLoadingState(false); // Після завершення HTTP-запиту з помилкою
                setErrorState(true); // Показати помилку
            });
    } else {
        catInfoDiv.innerHTML = ""; // Очистити вміст, якщо не вибрано породу
    }
});

// Викликаємо функцію для заповнення списка порід після завантаження сторінки
populateBreeds();
