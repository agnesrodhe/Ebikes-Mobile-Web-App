import React, { useState } from 'react';
import authModel from '../models/auth';
import userModel from '../models/user';
import '../style/general.css';
import '../style/login.css';
import "../style/loading.css";

function Login({ setDisplay, setUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function logIn() {
        if (!username || !password) {
            setErrorMessage("Fyll i alla fält!");
            return;
        }

        setLoading(true);

        const user = {
            "username": username,
            "password": password
        };

        const login = await authModel.signIn(user);

        console.log(login.error);

        if (!login) {
            setTimeout(() => {
                setLoading(false);
                setErrorMessage("Användaren finns inte");
            }, 1000);
            return;
        }

        if (login.error === "No customer found or wrong password") {
            setTimeout(() => {
                setLoading(false);
                setErrorMessage("Felaktig information");
            }, 1000);
            return;
        }

        const fullUser = await userModel.getUser(login._id);

        setTimeout(() => {
            setUser(fullUser);
        }, 1000);
    }

    return (
        <div className="login-field">
            <h1>Logga in</h1>

            {errorMessage &&
                <p data-testid="error" style={{color: "red"}}>{errorMessage}</p>
            }

            <div>Användarnamn</div>
            <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required />

            <div>Lösenord</div>
            <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required />

            {loading &&
                <div className="spinner-container">
                    <div className="loading-spinner"></div>
                </div>
            }

            <div className='login-buttons-container'>
                <button className="login-button" onClick={() => setDisplay("start")}>
                    <h4>Tillbaka</h4>
                </button>
                <button className="login-button" onClick={() => logIn()}>
                    <h4>Logga in</h4>
                </button>
            </div>
        </div>

    );
}

export default Login;
