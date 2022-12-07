import React, { useEffect, useState } from 'react';
//import { getDistance } from 'geolib';
import Map from './components/map';
import Logo from '../../assets/logo.png';
import '../../style/mytriptab.css';
import '../../style/buttons.css';
import bikesModel from '../../models/bikes';
import userModel from '../../models/user';
//import priceModel from '../../models/prices';
import functionsModel from './functions/functionsmodel';

function ShowTrip({ user, setUser, setOnGoingTrip, setShowReciept, setTripInfo }) {
    const [showMap, setShowMap] = useState(false);
    const [confirmEndTrip, setConfirmEndTrip] = useState(false);
    const [trip, setTrip] = useState({});
    const [priceList, setPriceList] = useState({});
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');
    const [preliminaryCost, setPreliminaryCost] = useState('');
    const [intervalID] = useState(
        setInterval(() => {
            updateTrip();
        }, 1000)
    );

    useEffect(() => {
        (async () => {
            //const prices = await priceModel.getPriceList();
            setPriceList({
                startFee: 10,
                minuteTaxa: 1.50
            });
            const currentTrip = JSON.parse(localStorage.getItem('trip'));

            setTrip(currentTrip);
        })();
    }, []);

    function updateTrip() {
        setMinutes(functionsModel.durationTime(trip).minutes);
        setSeconds(functionsModel.durationTime(trip).seconds);
        setPreliminaryCost(functionsModel.cost(trip, priceList));
    }

    useEffect(() => {
        (async () => {
            // get bike data pushed from backend
        });
    }, []);

    async function EndTrip() {
        clearInterval(intervalID);
        const allTripInfo = functionsModel.tripInfo(trip, priceList, user);
        const cost = allTripInfo.cost;
        const bikeHistory = allTripInfo.bikeHistory;
        const userHistory = allTripInfo.userHistory;

        await bikesModel.updateBike(trip.bikeId, {
            active: null,
            history: bikeHistory
        });

        await userModel.updateUser(user._id, {
            history: userHistory,
            balance: (user.balance - cost)
        });

        const updatedUser = await userModel.getUser(user._id);

        console.log(allTripInfo);

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
                            <p><b>Tid: </b>{minutes}min {seconds}s</p>
                            <p><b>Sträcka: </b></p>
                            <p><b>Preliminär kostnad: </b>{preliminaryCost}kr</p>

                            {!showMap && <>
                                <button className='main-button' onClick={() => setShowMap(true)}>
                                    <h4>Se på karta</h4>
                                </button></>
                            }

                            <button className='main-button red-button'
                                onClick={() => setConfirmEndTrip(true)}>
                                <h4>Avsluta resa</h4>
                            </button>
                        </>

                        :

                        <>
                            <div><p>Vill du avsluta resan?</p></div>

                            <button className='main-button'
                                onClick={() => EndTrip()}
                            >
                                <h4>Ja</h4>
                            </button>

                            <button className='main-button'
                                onClick={() => setConfirmEndTrip(false)}
                            >
                                <h4>Nej</h4>
                            </button>
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
