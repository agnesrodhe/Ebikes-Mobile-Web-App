import React, { useEffect, useState } from 'react';
import { getDistance } from 'geolib';
import Map from './components/map';
import Logo from '../../assets/logo.png';
import '../../style/mytriptab.css';
import '../../style/buttons.css';
import bikesModel from '../../models/bikes';
import userModel from '../../models/user';
import functionsModel from './functions/functionsmodel';

const baseURL = 'http://localhost:3002/v1/bikes/events/event/';

function ShowTrip({
    user,
    setUser,
    trip,
    setOnGoingTrip,
    setShowReciept,
    setTripInfo,
    priceList
}) {
    const [confirmEndTrip, setConfirmEndTrip] = useState(false);
    const [bike, setBike] = useState();
    const [tripParams, setTripParams] = useState(null);

    useEffect(() => {
        // create a interval and get the id
        const myInterval = setInterval(() => {
            const bikeInfo = JSON.parse(localStorage.getItem('bike'));
            const inParkingZone = functionsModel.inParkingZone(trip, bikeInfo);

            trip.stopInParkingZone = inParkingZone;
            setTripParams({
                cost: functionsModel.endCost(trip, priceList),
                minutes: functionsModel.durationTime(trip.startTime).minutes,
                seconds: functionsModel.durationTime(trip.startTime).seconds
            });
        }, 1000);

        // clear out the interval using the id when unmounting the component
        return () => clearInterval(myInterval);
    }, []);

    useEffect(() => {
        if ('EventSource' in window) {
            const source = new EventSource(
                `${baseURL}${trip.city._id}/${trip.bikeId}`, {withCredentials: true}
            );

            source.addEventListener('ping', e => {
                const jsonData = JSON.parse(e.data);

                setBike(jsonData);
                localStorage.setItem('bike', JSON.stringify(jsonData));
                if (jsonData.status === "noBattery") {
                    (async () => {
                        EndTrip();
                    })();
                }
            });
            source.addEventListener('open', function() {
                console.log("connected");
            }, false);
            source.addEventListener('error', function() {
                console.log("error");
            }, false);
            return () => {
                source.close();
            };
        }
        // eslint-disable-next-line
    }, [bike]);

    async function EndTrip() {
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

            // If bike is within 100 meters of parkingzone center
            if (distance <= 100) {
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
            status: "working",
            history: bikeHistory
        });

        await userModel.updateUser(user._id, {
            history: userHistory,
            balance: (user.balance - cost).toFixed(2)
        });

        const updatedUser = await userModel.getUser(user._id);

        setUser(updatedUser);

        localStorage.removeItem("trip");
        localStorage.removeItem("bike");
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
                    className="logo-smaller" />

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
                                                {tripParams.seconds === 60 ?
                                                    '00':tripParams.seconds}s
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Batterinivå: </th>
                                            <td>{bike && bike.batterylevel}%</td>
                                        </tr>
                                        <tr>
                                            <th>Slutsumma just nu: </th>
                                            <td><b>{tripParams.cost.totalCost.toFixed(2)}kr</b></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p style={{fontSize: '12px', marginTop: '5px'}}>
                                    <b>
                                    Slutsumman är inklusive eventuell
                                    parkeringsavgift och bonus. Resan avslutas
                                    automatiskt när batterinivån understiger 10%.
                                    </b>
                                </p>
                            </>
                            }

                            <div className='showtrip-buttons'>
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

                <div className='map-container'>
                    <Map
                        trip={trip}
                        bike={bike} />
                </div>
            </>
        </div>
    );
}

export default ShowTrip;
