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

        console.log(login);

        if (login.error === "No customer found") {
            setTimeout(() => {
                setLoading(false);
                setErrorMessage("Fel användarnamn eller lösenord");
            }, 1000);
            return;
        }

        const fullUser = await userModel.getUser(login._id);

        setTimeout(() => {
            setUser(fullUser);
        }, 1000);

        console.log(fullUser);
    }

    return (
        <div className="login-field">
            <button className="back-button" onClick={() => setDisplay("start")}>
                <p>Tillbaka</p>
            </button>

            <h2>Logga in</h2>

            {errorMessage &&
                <p style={{color: "red"}}>{errorMessage}</p>
            }

            <div>Användarnamn</div>
            <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required /><br></br>

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

            <button className="login-button" onClick={() => logIn()}>
                <h4>Logga in</h4>
            </button>
        </div>

    );
}

export default Login;
