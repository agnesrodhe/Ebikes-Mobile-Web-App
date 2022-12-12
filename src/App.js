import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import "../src/style/loading.css";
import Navigation from './tabnavigation/navigation.js';
import Index from './login/index.js';
import userModel from './models/user.js';

function App({ test }) {
    const [user, setUser] = useState(test || "loading");

    useEffect(() => {
        (async () => {
            if (!test) {
                const usr = await axios
                    .get('http://localhost:3002/v1/user/githubtoken', {
                        withCredentials: true
                    })
                    .then((res) => res.data);

                const usr2 = Cookies.get('github-jwt');

                if (!usr && !usr2) {
                    setUser(null);
                    return;
                }

                const fullUser = await userModel.getUser(usr.id || usr._id || usr2._id);

                setUser(fullUser);
            }
        })();
    }, []);

    return (
        <>
            {user === "loading" ?
                <div className="spinner-container-center">
                    <div className="loading-spinner"></div>
                </div>
                :
                <div>
                    {user && <Navigation user={user} setUser={setUser}/>}
                    {!user && <Index setUser={setUser}/>}
                </div>
            }
        </>
    );
}

export default App;
