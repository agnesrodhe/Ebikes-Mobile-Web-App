import React, { useEffect, useState } from 'react';
import { getDistance } from 'geolib';
import Map from './components/map';
import Logo from '../../assets/logo.png';
import '../../style/mytriptab.css';
import '../../style/buttons.css';
import bikesModel from '../../models/bikes';
import userModel from '../../models/user';
import functionsModel from './functions/functionsmodel';

function ShowTrip({ user, setUser, setOnGoingTrip, setShowReciept, setTripInfo, priceList }) {
    const [showMap, setShowMap] = useState(false);
    const [confirmEndTrip, setConfirmEndTrip] = useState(false);
    const [trip, setTrip] = useState({});
    const [tripParams, setTripParams] = useState(null);
    const [intervalID] = useState(null);

    useEffect(() => {
        const currentTrip = JSON.parse(localStorage.getItem('trip'));

        (async () => {
            if (currentTrip.userId === user._id) {
                setTrip(currentTrip);
            } else {
                setOnGoingTrip(false);
            }
        })();

        // create a interval and get the id
        const myInterval = setInterval(() => {
            setTripParams({
                cost: functionsModel.endCost(currentTrip, priceList),
                minutes: functionsModel.durationTime(currentTrip.startTime).minutes,
                seconds: functionsModel.durationTime(currentTrip.startTime).seconds
            });
        }, 1000);

        // clear out the interval using the id when unmounting the component
        return () => clearInterval(myInterval);
    }, []);

    async function EndTrip() {
        clearInterval(intervalID);

        const bike = await bikesModel.getOneBike(trip.bikeId);

        let parkedInParkingZone = false;

        trip.parkingZones.forEach(zone => {
            const distance = getDistance(
                bike.location.coordinates,
                {
                    latitude: zone.location.coordinates[1],
                    longitude: zone.location.coordinates[0]
                }
            );

            // If bike is within 700 meters of parkingzone center
            if (distance <= 700) {
                parkedInParkingZone = true;
            }
        });

        trip.stopInParkingZone = parkedInParkingZone;

        const allTripInfo = functionsModel.tripInfo(trip, priceList, user._id);
        const cost = allTripInfo.cost;
        const bikeHistory = allTripInfo.bikeHistory;
        const userHistory = allTripInfo.userHistory;

        await bikesModel.updateBike(trip.bikeId, {
            active: null,
            history: bikeHistory
        });

        await userModel.updateUser(user._id, {
            history: userHistory,
            balance: (user.balance - cost).toFixed(2)
        });

        const updatedUser = await userModel.getUser(user._id);

        setUser(updatedUser);

        localStorage.removeItem("trip");
        setTripInfo(userHistory);
        setShowReciept(true);
        setOnGoingTrip(false);
    }

    return (
        <div className='mytrip-container'>
            <>
                <img
                    src={Logo}
                    alt="logo"
                    className={showMap ? "logo-smaller":"logo"} />

                <h1>Du har en pågående resa:</h1>

                <div className='trip-container'>
                    {!confirmEndTrip ?
                        <>
                            {tripParams &&
                            <>
                                <table className='trip-table'>
                                    <tbody>
                                        <tr>
                                            <th>Tid: </th>
                                            <td>
                                                {tripParams.minutes}m
                                                {tripParams.seconds< 10 && '0'}
                                                {tripParams === 60 ? '00':tripParams.seconds}s
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Startavgift: </th>
                                            <td>{tripParams.cost.startFee}kr</td>
                                        </tr>
                                        <tr>
                                            <th>Rörlig avgift: </th>
                                            <td>{tripParams.cost.minuteCost.toFixed(2)}kr</td>
                                        </tr>
                                        <tr>
                                            <th>Preliminär summa: </th>
                                            <td><b>{tripParams.cost.totalCost.toFixed(2)}kr</b></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p style={{fontSize: '12px', marginTop: '5px'}}>
                                    <b>Parkeringsavgift kan tillkomma. För mer info se prislista.
                                    </b>
                                </p>
                            </>
                            }

                            <div className='showtrip-buttons'>
                                {!showMap && <>
                                    <button className='main-button-green'
                                        onClick={() => setShowMap(true)}
                                    >
                                        <h4>Se på karta</h4>
                                    </button></>
                                }

                                <button className='main-button red-button'
                                    onClick={() => setConfirmEndTrip(true)}>
                                    <h4>Avsluta resa</h4>
                                </button>
                            </div>
                        </>

                        :

                        <>
                            <div className='showtrip-buttons'>
                                <p>Vill du avsluta resan?</p>

                                <button className='main-button-orange'
                                    onClick={() => EndTrip()}
                                >
                                    <h4>Ja</h4>
                                </button>

                                <button className='main-button-orange'
                                    onClick={() => setConfirmEndTrip(false)}
                                >
                                    <h4>Nej</h4>
                                </button>
                            </div>
                        </>
                    }
                </div>

                {showMap ?
                    <div className='map-container'>
                        <Map trip={trip} />
                    </div>
                    :
                    <div style={{height: "100px"}}></div>
                }
            </>
        </div>
    );
}

export default ShowTrip;
