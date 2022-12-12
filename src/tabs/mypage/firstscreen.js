import React, { useState } from 'react';
import axios from 'axios';
import Logo from '../../assets/logo.png';
import '../../style/mypagetab.css';
import '../../style/buttons.css';
import "../../style/loading.css";

function FirstScreen({ user, setUser, setDisplay, message }) {
    const [loading, setLoading] = useState(false);

    async function logOut() {
        setLoading(true);

        setTimeout(async () => {
            await axios
                .get('http://localhost:3002/v1/user/logout', {
                    withCredentials: true
                })
                .then((res) => res.data);

            setUser(null);
        }, 1000);
    }

    return (
        <div className='mypage-container'>
            <img
                src={Logo}
                alt="logo"
                className="my-page-logo"
            />

            {loading &&
                <div className="spinner-container">
                    <div className="loading-spinner"></div>
                </div>
            }

            <div className='info-container'>
                <table>
                    <tbody>
                        <tr>
                            <th>Användarnamn</th>
                            <td>{user.username}</td>
                        </tr>
                        <tr>
                            <th>Förnamn</th>
                            <td>{user.firstName}</td>
                        </tr>
                        <tr>
                            <th>Efternamn</th>
                            <td>{user.lastName}</td>
                        </tr>
                        <tr>
                            <th>Saldo</th>
                            <td>{user.balance ? user.balance : "0"} kr</td>
                        </tr>
                    </tbody>
                </table>

                <div style={{textAlign: 'center'}}>
                    <h4 style={{color: 'green'}}>{message}</h4>
                </div>

                <div className='update-userinfo-container'>
                    <button className='main-button'>
                        <h4>Uppdatera uppgifter</h4>
                    </button>
                </div>
            </div>

            <div className='mypage-buttons-container'>
                <button className='main-button' onClick={() => setDisplay("balance")}>
                    <h4>Fyll på saldot</h4>
                </button>

                <button className='main-button' onClick={() => setDisplay("history")}>
                    <h4>Resehistorik</h4>
                </button>

                <button className='main-button' onClick={() => logOut()}>
                    <h4>Logga ut</h4>
                </button>
            </div>
        </div>
    );
}

export default FirstScreen;
