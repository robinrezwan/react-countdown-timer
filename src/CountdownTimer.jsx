import {useEffect, useState} from 'react'
import CircularProgress from "./CircularProgress.jsx";

function CountdownTimer({dateSince, dateUntil}) {
    const [totalTime, setTotalTime] = useState(null);
    const [remainingTime, setRemainingTime] = useState(null);

    useEffect(() => {
        const dateNow = new Date();

        const totalDuration = getDuration(dateSince, dateUntil);
        setTotalTime(totalDuration)
        console.log("totalDuration", totalDuration);

        const remainingDuration = getDuration(dateNow, dateUntil);
        setRemainingTime(remainingDuration);
        console.log("remainingDuration", remainingDuration);

        updateDuration();
    }, []);

    function getDuration(dateSince, dateUntil) {
        // Get the time difference in milliseconds
        const timeDiff = dateUntil.getTime() - dateSince.getTime();

        if (timeDiff < 0) {
            return {days: 0, hours: 0, minutes: 0, seconds: 0};
        }

        // Convert the time difference to days, hours, minutes, and seconds
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        // console.log(`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`);

        return {days, hours, minutes, seconds};
    }

    function updateDuration() {
        const dateNow = new Date();
        const remainingDuration = getDuration(dateNow, dateUntil);
        setRemainingTime(remainingDuration);
        setTimeout(updateDuration, 200);
    }

    return (
        <div>
            {(totalTime && remainingTime) ?
                <div style={{display: "flex", gap: "20px", padding: "10px"}}>
                    <CircularProgress
                        value={remainingTime.days}
                        maxValue={totalTime.days}
                        text={remainingTime.days}
                        footerText="Days"
                    />
                    <CircularProgress
                        value={remainingTime.hours}
                        maxValue={24}
                        text={remainingTime.hours}
                        footerText="Hours"
                    />
                    <CircularProgress
                        value={remainingTime.minutes}
                        maxValue={60}
                        text={remainingTime.minutes}
                        footerText="Minutes"
                    />
                    <CircularProgress
                        value={remainingTime.seconds}
                        maxValue={60}
                        text={remainingTime.seconds}
                        footerText="Seconds"
                    />
                </div> : null}
        </div>
    );
}

export default CountdownTimer;
