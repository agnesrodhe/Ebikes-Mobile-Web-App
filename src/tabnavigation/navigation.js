import React, { useState } from 'react';
import '../style/tabnav.css';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

import ElectricScooterIcon from '@mui/icons-material/ElectricScooter';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import FindScooters from '../tabs/findscooter/index.js';
import MyTrip from '../tabs/mytrip/index.js';
import MyPage from '../tabs/mypage/index.js';

function Navigation({ test, user, setUser }) {
    const [tab, setTab] = useState(test || 0);

    return (
        <div style={{ height: '100vh' }}>
            {tab === 0 && <FindScooters user={user} setTab={setTab} />}
            {tab === 1 && <MyTrip user={user} setUser={setUser} />}
            {tab === 2 && <MyPage user={user} setUser={setUser} />}
            <BottomNavigation
                sx={{ width: '100%', position: 'absolute', bottom: 0, color: 'green'}}
                showLabels
                value={tab}
                onChange={(event, newValue) => {
                    setTab(newValue);
                }}
            >
                <BottomNavigationAction label="Hitta scooter" icon={<TravelExploreIcon />} />
                <BottomNavigationAction label="Min resa" icon={<ElectricScooterIcon />} />
                <BottomNavigationAction label="Min sida" icon={<AccountBoxIcon />} />
            </BottomNavigation>
        </div>
    );
}

export default Navigation;
