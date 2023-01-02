import React, { useState } from 'react';
import axios from 'axios';
import Logo from '../../assets/logo.png';
import '../../style/mypagetab.css';
import '../../style/buttons.css';
import "../../style/loading.css";
import userModel from '../../models/user';

function FirstScreen({ user, setUser, setDisplay, message }) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showInputs, setShowInputs] = useState(false);
    const [firstname, setFirstname] = useState(user.firstName);
    const [lastname, setLastname] = useState(user.lastName);

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

    async function updateUser() {
        if (firstname === user.firstName && lastname === user.lastName) {
            setErrorMessage("Ingen ändring har gjorts");
            return;
        }

        setLoading(true);
        setErrorMessage('');

        if (!/^[a-z]+$/i.test(firstname) || !/^[a-z]+$/i.test(lastname)) {
            setErrorMessage("Endast bokstäver tillåtna");
            setLoading(false);
            return;
        }
        const newNames = {
            firstName: firstname,
            lastName: lastname
        };

        await userModel.updateUser(user._id, newNames);
        const updatedUser = await userModel.getUser(user._id);

        console.log(updatedUser);

        setUser(updatedUser);

        setTimeout(() => {
            setShowInputs(false);
            setLoading(false);
            setErrorMessage('');
        }, 1000);
    }

    return (
        <div className='mypage-container'>
            <img
                src={Logo}
                alt="logo"
                className="my-page-logo"
            />

            <div className='info-container'>
                {!showInputs ?
                    <>
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
                                    <td>{user.balance ?
                                        parseFloat(user.balance).toFixed(2) : "0"} kr</td>
                                </tr>
                            </tbody>
                        </table>

                        {user.balance < 0 &&
                            <p style={{color: 'red', marginTop: '10px'}}>
                            Ditt saldo är negativt. Fyll på med pengar för att undvika faktura.
                            </p>
                        }
                    </>
                    :
                    <>
                        <div>Förnamn</div>
                        <input
                            type="text"
                            value={firstname}
                            onChange={(event) => setFirstname(event.target.value)}
                            required />

                        <div>Efternamn</div>
                        <input
                            type="text"
                            value={lastname}
                            onChange={(event) => setLastname(event.target.value)}
                            required />
                    </>


                }

                {loading &&
                    <div className="spinner-container">
                        <div className="loading-spinner"></div>
                    </div>
                }

                <div style={{textAlign: 'center'}}>
                    <h4 style={{color: 'green'}}>{message}</h4>
                </div>

                <div style={{textAlign: 'center'}}>
                    <p style={{color: 'red'}}>{errorMessage}</p>
                </div>

                {!showInputs ?
                    <div className='update-userinfo-buttons-container'>
                        <button onClick={() => setShowInputs(true)}
                            className='main-button-green'>
                            <h4 style={{marginBottom: '3px'}}>Uppdatera uppgifter</h4>
                        </button>
                    </div>
                    :
                    <div className='update-userinfo-buttons-container'>
                        <button className="login-button" onClick={() => {
                            setShowInputs(false);
                            setErrorMessage('');
                            setFirstname(user.firstName);
                            setLastname(user.lastName);
                        }}>
                            <h4>Avbryt</h4>
                        </button>
                        <button className="login-button" onClick={() => updateUser()}>
                            <h4>Uppdatera</h4>
                        </button>
                    </div>
                }
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
