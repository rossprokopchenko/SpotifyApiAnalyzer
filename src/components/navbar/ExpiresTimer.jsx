import React, { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import {getRemainingTimeUntilMs} from './ExpiresTimerUtils';

const defaultRemainingTime = {
    minutes: '00',
    seconds: '00'
}


function ExpiresTimer(props) {
    const {timer, logout} = props;
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
    let intervalId;

    useEffect(() => {
        intervalId = setInterval(() => {
            updateRemainingTime(timer);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timer]);

    function updateRemainingTime(countdown) {
        setRemainingTime(getRemainingTimeUntilMs(countdown));

        if(getRemainingTimeUntilMs(countdown).minutes === defaultRemainingTime.minutes
        && getRemainingTimeUntilMs(countdown).seconds === defaultRemainingTime.seconds
        && window.localStorage.getItem("token")) {
            clearInterval(intervalId);
            logout();
        }
    }

    return (
        <div>
            <Badge bg='secondary' text='white'>{remainingTime.minutes} : {remainingTime.seconds}</Badge>
        </div>
    );
}

export default ExpiresTimer;