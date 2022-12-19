// Manage user

const baseURL = "http://localhost:3002";

const userModel = {
    getUser: async function getUser(userId) {
        const result = fetch(`${baseURL}/v1/customers/${userId}`, {
            method: 'GET',
            credentials: 'include'
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
    updateUser: async function updateUser(userId, body) {
        const result = fetch(`${baseURL}/v1/user/${userId}`, {
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
                console.log(error);
            });

        return result;
    }
};

export default userModel;
