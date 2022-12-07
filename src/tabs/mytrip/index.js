import React, { useEffect, useState } from 'react';
import NoTrip from './notrip';
import ShowTrip from './showtrip';
import TripEnded from './tripended';
import '../../style/mypagetab.css';
import '../../style/buttons.css';

function MyTrip({ user, setUser }) {
    const [onGoingTrip, setOnGoingTrip] = useState(false);
    const [showReciept, setShowReciept] = useState(false);
    const [tripInfo, setTripInfo] = useState({});

    useEffect(() => {
        const currentTrip = localStorage.getItem('trip');

        if (currentTrip) {
            setOnGoingTrip(true);
        }
    }, []);

    return (
        <>
            {onGoingTrip &&
                <ShowTrip
                    user={user}
                    setUser={setUser}
                    setOnGoingTrip={setOnGoingTrip}
                    setShowReciept={setShowReciept}
                    setTripInfo={setTripInfo}
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
