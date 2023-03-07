import './App.css'
import CountdownTimer from "./CountdownTimer.jsx";

function App() {
    const dateSince = new Date("2023-03-01T00:00:00.000Z");
    const dateUntil = new Date("2023-03-31T00:00:00.000Z");

    return (
        <CountdownTimer
            dateSince={dateSince}
            dateUntil={dateUntil}
        />
    );
}

export default App;
