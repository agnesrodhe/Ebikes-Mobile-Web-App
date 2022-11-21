import React from 'react';
import FirstScreen from './firstscreen';
import '../../style/mypagetab.css';
import '../../style/buttons.css';

function MyPage({ setIsLoggedIn }) {

return (
    <FirstScreen setIsLoggedIn={setIsLoggedIn} />
  )
};

export default MyPage;