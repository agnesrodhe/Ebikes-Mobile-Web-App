// Manage cities

const baseURL = "http://localhost:3002";

const citiesModel = {
    getAllCities: async function getAllCities() {
        const result = fetch(`${baseURL}/v1/cities`, {
            credentials: 'include',
        })
            .then(r => r.json())
            .then(result => {return result;})
            .catch((error) => {
                return error;
            });

        return result;
    },
    getParkingZones: async function getParkingZones(cityId) {
        const result = fetch(`${baseURL}/v1/parking`, {
            credentials: 'include',
        })
            .then(r => r.json())
            .then(result => {
                const inCity = result.filter((chargingStation) => {
                    if (chargingStation.inCity === cityId) {
                        return chargingStation;
                    }
                });

                return inCity;
            })
            .catch((error) => {
                return error;
            });

        return result;
    }
};

export default citiesModel;
