// Manage login

const baseURL = "http://localhost:3002";

const authModel = {
    signIn: async function signIn(user) {
        // withCredentials
        const result = fetch(`${baseURL}/v1/user/signin`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(user),
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

    signUp: async function signUp(user) {
        const result = fetch(`${baseURL}/v1/user/signup`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user),
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.error(error);
            });

        return result;
    }
};

export default authModel;
