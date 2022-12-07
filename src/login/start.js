import React from 'react';
import github from '../assets/git_logo.png';
import '../style/login.css';
import '../style/buttons.css';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const gitHubRedirectURL = "http://localhost:3002/v1/user/auth/github";
const path = "/";

function Start({ setDisplay }) {
    return (
        <div className="start-buttons">
            <button className="main-button" onClick={() => setDisplay("login")}>
                <h4>Logga in</h4>
            </button>

            <button className="main-button"
                style={{ marginBottom: '20px' }}
                onClick={() => setDisplay("register")}
            >
                <h4>Ny användare</h4>
            </button>

            <a className='github-container'
                href={`https://github.com/login/oauth/authorize?` +
                `client_id=${CLIENT_ID}&` +
                `redirect_uri=${gitHubRedirectURL}?` +
                `path=${path}&scope=user:email`}>
                <div className="github-button">
                    <img src={github}/>
                    <p>Logga in med GitHub</p>
                </div>
            </a>
        </div>
    );
}

export default Start;
