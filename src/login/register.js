import React, { useState } from 'react';
import '../style/login.css';
import "../style/loading.css";

function Register({ setDisplay, setNewUserCreated }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // Set email.
    const handleEmailChange = event => {
        setEmail(event.target.value);
    };

    // Set password.
    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    function Register() {
        setLoading(true);
        setTimeout(() => {
            setNewUserCreated(true);
            setDisplay("start");
            setTimeout(() => {
                setNewUserCreated(false);
            }, 2000);
        }, 1500);
    }

    return (
        <div className="login-field">

            <button className="back-button" onClick={() => setDisplay("start")}>
                <p>Tillbaka</p>
            </button>

            <h2>Skapa användare</h2>

            <input
                type="text"
                placeholder="E-MAIL"
                value={email}
                onChange={handleEmailChange}
                required /><br></br>

            <input
                type="password"
                placeholder="LÖSENORD"
                value={password}
                onChange={handlePasswordChange}
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
