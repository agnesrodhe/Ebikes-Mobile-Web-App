import React, { useState } from 'react';
import Logo from '../../assets/logo.png';
import '../../style/mypagetab.css';
import '../../style/buttons.css';
import '../../style/loading.css';
import userModel from '../../models/user';

function Balance({ setDisplay, user, setUser, setMessage }) {
    const [moneyInput, setMoneyInput] = useState(0);
    const [selectedButton, setSelectedButton] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    async function insertMoney() {
        setLoading(true);

        // Check if button is selected
        if (selectedButton === 0) {
            setErrorMessage("Ingen summa vald");
            setLoading(false);
            return;
        }

        // Update user
        let balance;

        if (user.balance) {
            balance = parseFloat(user.balance) + moneyInput;
        } else {
            balance = moneyInput;
        }

        const newBalance = {
            balance: balance
        };

        await userModel.updateUser(user._id, newBalance);

        const updatedUser = await userModel.getUser(user._id);

        // Reset interface
        setTimeout(() => {
            setUser(updatedUser);
            setSelectedButton(0);
            setLoading(false);
            setMessage(moneyInput + "kr är överförda!");
            setDisplay("firstscreen");
        }, 1500);

        setTimeout(() => {
            setMessage('');
        }, 8000);

        return newBalance;
    }

    return (
        <div className='mypage-container'>
            <img
                src={Logo}
                alt="logo"
                className="my-page-logo"
            />

            <div className='info-container'>
                <table>
                    <tbody>
                        <tr>
                            <th>Saldo</th>
                            <td>{user.balance ? user.balance : "0"} kr</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='info-container'>
                <p>Välj summa:</p>
                <div style={{color: 'red'}}>{errorMessage}</div>

                {loading &&
                    <div className="spinner-container">
                        <div className="loading-spinner"></div>
                    </div>
                }

                <div className='money-input-container'>
                    <button className={
                        selectedButton === 1 ? 'selected-amount-button': 'amount-button'
                    } onClick={() => {
                        setSelectedButton(1);
                        setMoneyInput(50);
                    }}>
                        <h4>50kr</h4>
                    </button>

                    <button className={
                        selectedButton === 2 ? 'selected-amount-button': 'amount-button'
                    } onClick={() => {
                        setSelectedButton(2);
                        setMoneyInput(100);
                    }}>
                        <h4>100kr</h4>
                    </button>

                    <button className={
                        selectedButton === 3 ? 'selected-amount-button': 'amount-button'
                    } onClick={() => {
                        setSelectedButton(3);
                        setMoneyInput(200);
                    }}>
                        <h4>200kr</h4>
                    </button>

                    <button className={
                        selectedButton === 4 ? 'selected-amount-button': 'amount-button'
                    } onClick={() => {
                        setSelectedButton(4);
                        setMoneyInput(500);
                    }}>
                        <h4>500kr</h4>
                    </button>
                </div>

                <div className='money-action-buttons-container'>
                    <button
                        className='money-action-button'
                        onClick={() => {
                            setDisplay("firstscreen");
                        }}>
                        <h4>Avbryt</h4>
                    </button>

                    <button
                        className='money-action-button'
                        onClick={() => insertMoney()}>
                        <h4>Sätt in</h4>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Balance;
