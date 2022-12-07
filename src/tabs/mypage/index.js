import React, { useState } from 'react';
import FirstScreen from './firstscreen';
import History from './history';
import Balance from './balance';
import '../../style/mypagetab.css';
import '../../style/buttons.css';

function MyPage({ user, setUser}) {
    const [display, setDisplay] = useState("firstscreen");
    const [message, setMessage] = useState('');

    return (
        <>
            {display === "firstscreen" &&
                <FirstScreen
                    user={user}
                    setUser={setUser}
                    setDisplay={setDisplay}
                    message={message}
                />

            }

            {display === "history" &&
                <History
                    user={user}
                    setDisplay={setDisplay}
                />
            }

            {display === "balance" &&
                <Balance
                    user={user}
                    setUser={setUser}
                    setDisplay={setDisplay}
                    setMessage={setMessage}
                />
            }
        </>
    );
}

export default MyPage;
