import React, { useState } from 'react';
import Navigation from './tabnavigation/navigation.js';
import Index from './login/index.js';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("loggedIn") || false);

    return (
        <div>
            {isLoggedIn && <Navigation setIsLoggedIn={setIsLoggedIn}/>}
            {!isLoggedIn && <Index setIsLoggedIn={setIsLoggedIn}/>}
        </div>
    );
}

export default App;
