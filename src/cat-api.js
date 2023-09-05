import axios from "axios";

const apiKey = "live_8dbmcwczl2BD780JhZKJEyUt601F1OUO2LkZtyy3jHlhgPRNBH3MoyPJxbjfHCAB";
axios.defaults.headers.common["x-api-key"] = apiKey;

export function fetchBreeds() {
    return axios.get("https://api.thecatapi.com/v1/breeds")
        .then(response => {
            return response.data.map(breed => ({
                id: breed.id,
                name: breed.name
            }));
        })
        .catch(error => {
            throw new Error("Помилка при отриманні списку порід: " + error);
        });
}

export function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(response => {
            const catData = response.data[0]; // Оскільки ми отримуємо масив, візьмемо перший об'єкт з нього
            return {
                imageUrl: catData.url,
                breedName: catData.breeds[0].name,
                description: catData.breeds[0].description,
                temperament: catData.breeds[0].temperament
            };
        })
        .catch(error => {
            throw new Error("Помилка при отриманні інформації про кота: " + error);
        });
}
