import React, { useState } from 'react';
import authModel from '../models/auth';
import '../style/general.css';
import '../style/login.css';
import "../style/loading.css";

function Register({ setDisplay, setNewUserCreated }) {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function Register() {
        if (!username || !password || !firstName || !lastName) {
            setErrorMessage("Fyll i alla fält!");
            return;
        }

        setLoading(true);

        const newUser = {
            "username": username,
            "password": password,
            "firstName": firstName,
            "lastName": lastName
        };

        const createUser = await authModel.signUp(newUser);

        if (createUser.error) {
            setErrorMessage("Något fick fel...");
            setLoading(false);
            return;
        }

        setTimeout(() => {
            setNewUserCreated(true);
            setDisplay("start");
            setTimeout(() => {
                setNewUserCreated(false);
            }, 10000);
            setLoading(false);
        }, 1000);
    }

    return (
        <div className="login-field">

            <button className="back-button" onClick={() => setDisplay("start")}>
                <p>Tillbaka</p>
            </button>

            <h2>Skapa användare</h2>

            {errorMessage &&
                <p style={{color: "red"}}>{errorMessage}</p>
            }

            <div>Förnamn</div>
            <input
                type="text"
                value={firstName}
                onChange={(event) => {setFirstName(event.target.value);}}
                required /><br></br>

            <div>Efternamn</div>
            <input
                type="text"
                value={lastName}
                onChange={(event) => {setLastName(event.target.value);}}
                required /><br></br>

            <div>Användarnamn</div>
            <input
                type="text"
                value={username}
                onChange={(event) => {setUsername(event.target.value);}}
                required /><br></br>

            <div>Lösenord</div>
            <input
                type="password"
                value={password}
                onChange={(event) => {setPassword(event.target.value);}}
                required />

            {loading &&
                <div className="spinner-container">
                    <div className="loading-spinner"></div>
                </div>
            }

            <button className="login-button" onClick={() => Register()}>
                <h4>Skapa</h4>
            </button>
        </div>

    );
}

export default Register;
