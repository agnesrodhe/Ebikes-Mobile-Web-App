import React, { useState } from 'react';
import Logo from '../../assets/logo.png';
import '../../style/mypagetab.css';
import '../../style/buttons.css';

function History({ user, setDisplay }) {
    const [history] = useState([...user.history].reverse());

    return (
        <div className='mytrip-container'>
            <img
                src={Logo}
                alt="logo"
                className="logo"
            />

            <div className='page-container'>
                <div className="history-title"><h1>Resehistorik</h1></div>

                <div className='history-container'>
                    {history.map((trip, index) => {
                        return  <table className='history-table' key={index}>
                            <tbody className='one-trip'>
                                <tr>
                                    <th>Stad</th>
                                    <td>{trip.city}</td>
                                </tr>
                                <tr>
                                    <th>Datum</th>
                                    <td>{new Date(trip.starttime).toDateString()}</td>
                                </tr>
                                <tr>
                                    <th>Starttid</th>
                                    <td>
                                        {new Date(trip.starttime).getHours() < 10 && "0"}
                                        {new Date(trip.starttime).getHours()}:
                                        {new Date(trip.starttime).getMinutes() < 10 && "0"}
                                        {new Date(trip.starttime).getMinutes()}:
                                        {new Date(trip.starttime).getSeconds() < 10 && "0"}
                                        {new Date(trip.starttime).getSeconds()}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Stoptid</th>
                                    <td>
                                        {new Date(trip.stoptime).getHours() < 10 && "0"}
                                        {new Date(trip.stoptime).getHours()}:
                                        {new Date(trip.stoptime).getMinutes() < 10 && "0"}
                                        {new Date(trip.stoptime).getMinutes()}:
                                        {new Date(trip.stoptime).getSeconds() < 10 && "0"}
                                        {new Date(trip.stoptime).getSeconds()}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Längd</th>
                                    <td>{trip.duration.minutes}m {trip.duration.seconds}s</td>
                                </tr>
                                <tr>
                                    <th>Startavgift</th>
                                    <td>{trip.cost.startfee} kr</td>
                                </tr>
                                <tr>
                                    <th>Rörlig kostnad</th>
                                    <td>{trip.cost.minutecost} kr</td>
                                </tr>
                                <tr>
                                    <th>Parkeringsavgift</th>
                                    <td>{trip.cost.penaltyfee} kr</td>
                                </tr>
                                <tr>
                                    <th>Bonus</th>
                                    <td>{trip.cost.bonus} kr</td>
                                </tr>
                                <tr className='sum-row'>
                                    <th>Summa</th>
                                    <td><b>{trip.cost.totalcost} kr</b></td>
                                </tr>
                            </tbody>
                        </table>;
                    })}
                </div>

                <div style={{textAlign: 'center'}}>
                    <button onClick={() => {
                        setDisplay("firstscreen");
                    }} className='main-button-green'
                    style={{marginBottom: '50px'}}><h4>Tillbaka</h4></button>
                </div>
            </div>

            <div></div>
        </div>
    );
}

export default History;
