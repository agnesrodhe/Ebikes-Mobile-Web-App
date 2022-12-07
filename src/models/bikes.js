// Manage bikes

const baseURL = "http://localhost:3002";

const bikesModel = {
    getAllBikes: async function getAllBikes() {
        const result = fetch(`${baseURL}/v1/bikes`)
            .then(r => r.json())
            .then(result => {
                return result;
            })
            .catch((error) => {
                console.log(error);
            });

        return result;
    },
    getAllBikesInCity: async function getAllBikesInCity(cityId) {
        const result = fetch(`${baseURL}/v1/bikes/city/${cityId}/nonactive`)
            .then(r => r.json())
            .then(result => {
                return result;
            })
            .catch((error) => {
                console.log(error);
            });

        return result;
    },
    getOneBike: async function getOneBike(bikeId) {
        const result = fetch(`${baseURL}/v1/bikes/${bikeId}`)
            .then(r => r.json())
            .then(result => {
                return result;
            })
            .catch((error) => {
                console.log(error);
            });

        return result;
    },
    updateBike: async function updateBike(bikeId, body) {
        const result = fetch(`${baseURL}/v1/bikes/${bikeId}`, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.log(error);
            });

        return result;
    },
};

export default bikesModel;