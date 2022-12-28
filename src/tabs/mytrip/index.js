import React, { useEffect, useState } from 'react';
import NoTrip from './notrip';
import ShowTrip from './showtrip';
import TripEnded from './tripended';
import '../../style/mypagetab.css';
import '../../style/buttons.css';

function MyTrip({ user, priceList, setUser }) {
    const [onGoingTrip, setOnGoingTrip] = useState(false);
    const [showReciept, setShowReciept] = useState(false);
    const [tripInfo, setTripInfo] = useState({});
    const [trip, setTrip] = useState({});

    useEffect(() => {
        const currentTrip = JSON.parse(localStorage.getItem('trip'));

        if (currentTrip) {
            setOnGoingTrip(true);
            setTrip(currentTrip);
        }
    }, []);

    return (
        <>
            {onGoingTrip &&
                <ShowTrip
                    user={user}
                    setUser={setUser}
                    trip={trip}
                    setOnGoingTrip={setOnGoingTrip}
                    setShowReciept={setShowReciept}
                    setTripInfo={setTripInfo}
                    priceList={priceList}
                />
            }

            {!onGoingTrip &&
                <>
                    {showReciept
                        ? <TripEnded tripInfo={tripInfo} />
                        : <NoTrip />
                    }
                </>
            }
        </>
    );
}

export default MyTrip;
