import React from 'react';
import Logo from '../../assets/logo.png';
import '../../style/mytriptab.css';
import '../../style/buttons.css';

function TripEnded({ tripInfo }) {
    return (
        <div className='mytrip-container'>
            <img
                src={Logo}
                alt="logo"
                className="logo"
            />

            <div className='trip-container'>
                <div style={{textAlign: 'center'}}><h1>Resa avslutad</h1></div>

                <table className='tripended-table'>
                    <tbody className='tripended-trip'>
                        <tr>
                            <th>Stad</th>
                            <td>{tripInfo.city}</td>
                        </tr>
                        <tr>
                            <th>Datum</th>
                            <td>{new Date(tripInfo.starttime).toDateString()}</td>
                        </tr>
                        <tr>
                            <th>Starttid</th>
                            <td>
                                {new Date(tripInfo.starttime).getHours() < 10 && "0"}
                                {new Date(tripInfo.starttime).getHours()}:
                                {new Date(tripInfo.starttime).getMinutes() < 10 && "0"}
                                {new Date(tripInfo.starttime).getMinutes()}:
                                {new Date(tripInfo.starttime).getSeconds() < 10 && "0"}
                                {new Date(tripInfo.starttime).getSeconds()}
                            </td>
                        </tr>
                        <tr>
                            <th>Stopptid</th>
                            <td>
                                {new Date(tripInfo.stoptime).getHours() < 10 && "0"}
                                {new Date(tripInfo.stoptime).getHours()}:
                                {new Date(tripInfo.stoptime).getMinutes() < 10 && "0"}
                                {new Date(tripInfo.stoptime).getMinutes()}:
                                {new Date(tripInfo.stoptime).getSeconds() < 10 && "0"}
                                {new Date(tripInfo.stoptime).getSeconds()}
                            </td>
                        </tr>
                        <tr>
                            <th>Längd</th>
                            <td>{tripInfo.duration.minutes}m {tripInfo.duration.seconds}s</td>
                        </tr>
                        <tr>
                            <th>Startavgift</th>
                            <td>{tripInfo.cost.startfee} kr</td>
                        </tr>
                        <tr>
                            <th>Rörlig kostnad</th>
                            <td>{tripInfo.cost.minutecost} kr</td>
                        </tr>
                        <tr>
                            <th>Parkeringsavgift</th>
                            <td>{tripInfo.cost.penaltyfee} kr</td>
                        </tr>
                        <tr>
                            <th>Bonus</th>
                            <td>{tripInfo.cost.bonus} kr</td>
                        </tr>
                        <tr className='sum-row'>
                            <th>Summa</th>
                            <td><b>{tripInfo.cost.totalcost} kr</b></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div></div>
            <div></div>
        </div>
    );
}

export default TripEnded;
