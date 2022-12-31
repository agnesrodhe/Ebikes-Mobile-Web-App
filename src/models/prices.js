// Get pricelist

const baseURL = "http://localhost:3002";

const priceModel = {
    getPriceList: async function getPriceList() {
        const result = fetch(`${baseURL}/v1/prices`, {
            method: 'GET',
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
    }
};

export default priceModel;
