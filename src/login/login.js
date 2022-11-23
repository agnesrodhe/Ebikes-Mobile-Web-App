import React, { useState } from 'react';
import '../style/login.css';
import "../style/loading.css";

function Login({ setDisplay, setIsLoggedIn }) {
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

    function logIn() {
        setLoading(true);
        setTimeout(() => {
            setIsLoggedIn(true);
        }, 1500);
        localStorage.setItem("loggedIn", true);
    }

    return (
        <div className="login-field">
            <button className="back-button" onClick={() => setDisplay("start")}>
                <p>Tillbaka</p>
            </button>

            <h2>Logga in</h2>

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

            <button className="login-button" onClick={() => logIn()}>
                <h4>Logga in</h4>
            </button>
        </div>

    );
}

export default Login;
