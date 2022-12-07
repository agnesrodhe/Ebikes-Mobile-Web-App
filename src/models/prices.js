// Get pricelist

const baseURL = "http://localhost:3002";

const priceModel = {
    getPriceList: async function getPriceList() {
        const result = fetch(`${baseURL}/v1/prices`)
            .then(r => r.json())
            .then(result => {
                return result.data;
            })
            .catch((error) => {
                console.log(error);
            });

        return result;
    }
};

export default priceModel;
