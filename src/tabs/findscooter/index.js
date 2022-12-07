import React, { useState } from 'react';
import FirstScreen from './screens/firstscreen.js';
import MapView from './screens/mapview.js';

function FindScooters({ user, setTab }) {
    const [screen, setScreen] = useState("firstscreen");
    const [city, setCity] = useState("");
    const [coordinates, setCoordinates] = useState("");

    return (
        <div>

            {screen === "firstscreen" &&
                <FirstScreen
                    user={user}
                    setScreen={setScreen}
                    setCity={setCity}
                    setCoordinates={setCoordinates}
                />
            }

            {screen === "map" &&
                <MapView
                    user={user}
                    setScreen={setScreen}
                    city={city}
                    coordinates={coordinates}
                    setTab={setTab}
                />
            }
        </div>
    );
}

export default FindScooters;
