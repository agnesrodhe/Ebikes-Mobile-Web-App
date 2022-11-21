import React from 'react';
import '../../style/mypagetab.css';
import '../../style/buttons.css';

function FirstScreen({ setIsLoggedIn }) {

  function logOut() {
    localStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
  }
  
return (
    <div className='mypage-container'>

      <button className='main-button' onClick={() => logOut()}>
        <h4>Logga ut</h4>
      </button>

    </div>
  )
};

export default FirstScreen;