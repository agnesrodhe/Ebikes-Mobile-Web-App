// Manage bikes

const baseURL = "http://localhost:3002";

const bikesModel = {
    getAllBikes: async function getAllBikes() {
        const result = fetch(`${baseURL}/v1/bikes`, {
            credentials: 'include',
        })
            .then(r => r.json())
            .then(result => {
                return result;
            })
            .catch((error) => {
                return error;
            });

        return result;
    },
    getAllBikesInCity: async function getAllBikesInCity(cityId) {
        const result = fetch(`${baseURL}/v1/bikes/city/${cityId}/nonactive`, {
            credentials: 'include',
        })
            .then(r => r.json())
            .then(result => {
                return result;
            })
            .catch((error) => {
                return error;
            });

        return result;
    },
    getOneBike: async function getOneBike(bikeId) {
        const result = fetch(`${baseURL}/v1/bikes/${bikeId}`, {
            credentials: 'include',
        })
            .then(r => r.json())
            .then(result => {
                return result;
            })
            .catch((error) => {
                return error;
            });

        return result;
    },
    updateBike: async function updateBike(bikeId, body) {
        const result = fetch(`${baseURL}/v1/bikes/${bikeId}`, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return error;
            });

        return result;
    },
};

export default bikesModel;
