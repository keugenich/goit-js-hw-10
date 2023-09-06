const URL = 'https://api.thecatapi.com/v1';
const API_KEY =
    'live_8dbmcwczl2BD780JhZKJEyUt601F1OUO2LkZtyy3jHlhgPRNBH3MoyPJxbjfHCAB';

export function fetchBreeds() {
    return fetch(`${URL}/breeds?api_key=${API_KEY}`)
        .then(response => {
            if (!response.ok) {
                console.error('Error fetching breeds:', response.status);
                throw new Error('Failed to fetch breeds');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Fetch breeds error:', error);
            throw error;
        });
}

export function fetchCatByBreed(breedId) {
    return fetch(`${URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`)
        .then(response => {
            if (!response.ok) {
                console.error('Error fetching cat by breed:', response.status);
                throw new Error('Failed to fetch cat by breed');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Fetch cat by breed error:', error);
            throw error;
        });
}
