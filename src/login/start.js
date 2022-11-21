import React from 'react';
import '../style/login.css';
import '../style/buttons.css';

function Start({ setDisplay }) {
return (
    <div className="start-buttons">

        <button className="main-button" onClick={() => setDisplay("login")}>
          <h4>Logga in</h4>
        </button>

        <button className="main-button" onClick={() => setDisplay("register")}>
          <h4>Ny användare</h4>
        </button>

    </div>

  )
};

export default Start;