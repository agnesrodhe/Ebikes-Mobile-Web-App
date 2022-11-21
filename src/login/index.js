import React, { useState } from 'react';
import '../style/login.css';
import Logo from '../assets/logo.png';
import Start_img from '../assets/start_img.png';
import Start from './start.js';
import Login from './login.js';
import Register from './register.js';

function Index({ setIsLoggedIn }) {
  const [display, setDisplay] = useState("start");
  const [newUserCreated, setNewUserCreated] = useState(false);

return (
    <div className="green-container">

      <img src={Logo} alt="logo" className="logo" />

      <div>
        {newUserCreated ? 
          <p className="new-user-created">Ny användare skapad!</p>
        :
          <p className='start-placeholder'></p>
        }

        {display === "start" && 
          <Start setDisplay={setDisplay} />
        }
      </div>

      {display === "login" && 
        <Login setDisplay={setDisplay} setIsLoggedIn={setIsLoggedIn} />
      }

      {display === "register" && 
        <Register setDisplay={setDisplay} setNewUserCreated={setNewUserCreated} />
      }

      <img src={Start_img} alt="illustration" className="start-img" />

    </div>
  )
};

export default Index;