import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BusSearchResult.css';

var user_name = sessionStorage.getItem("user_name");

function timechg(str) {
    const [date, time1] = str.split("T");
    const [time, x] = time1.split(".")
    return `${time}`
}

const BusSearchForm = () => {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [busData, setBusData] = useState([]);
    const [tripData, setTripData] = useState([]);
    const [bookData, setBookData] = useState([]);
    let selectedSeatId = '';

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/api/getroutes?from=${source}&to=${destination}`);

            if (!response.ok) {
                throw new Error('Failed to fetch Route data');
            }
            const newdata = await response.json();
            setData(newdata);
            console.log("Get Route Result ********************");
            console.log(newdata);
            const busPromises = newdata.map(async (route) => {
                const busResponse = await fetch(`http://localhost:3001/api/getbus?bus_id=${route.bus_id}`);
                const newbusData = await busResponse.json();
                return newbusData;
            });

            const tripPromises = newdata.map(async (route) => {
                const tripResponse = await fetch(`http://localhost:3001/api/gettrip?r_id=${route.r_id}&tripdate=${date}`);
                const newtripData = await tripResponse.json();
                return newtripData;
            });

            const bookPromises = newdata.map(async (route) => {
                const tripResponse = await fetch(`http://localhost:3001/api/getBookingTrans?user_name=${user_name}`);
                const newtripData = await tripResponse.json();
                return newtripData;
            });

            const busResults = await Promise.all(busPromises);
            const tripResults = await Promise.all(tripPromises);

            setBusData(busResults);
            setTripData(tripResults);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    function generateSeatButtons(totalseats) {
        const seatButtons = [];
        for (let i = 1; i <= totalseats; i += 2) {
            seatButtons.push(
                <div style={{ marginBottom: '10px' }} key={i}>
                    <label>
                        <input
                            type="radio"
                            id={`seat_${i}`}
                            name="seat"
                            value={`Seat${i}`}
                            onClick={() => handleSeat(`seat_${i}`)}
                        />
                        {`Seat ${i}`}
                    </label>
                    {i + 1 <= totalseats && (
                        <label>
                            <input
                                type="radio"
                                id={`seat_${i + 1}`}
                                name="seat"
                                value={`Seat ${i + 1}`}
                                onClick={() => handleSeat(`seat_${i + 1}`)}
                            />
                            {`Seat ${i + 1}`}
                        </label>
                    )}
                </div>
            );
        }
        return seatButtons;
    }

   
    const handleSeat = (seatId) => {
        selectedSeatId = seatId;
        console.log(selectedSeatId);
        sessionStorage.setItem("seat_id", selectedSeatId);
        sessionStorage.setItem("trip_id", tripData.trip_id);
    };


    //for view transaction
    function handleClick() {
        window.location = '/myTransaction';
    }


    const handleBooking = async () => {
        navigate('/passenger');
    };


            return (
            <div>
                <button style={{ marginLeft: "0%" }} onClick={handleClick}>View Transactions</button>
                <h2>Search Buses</h2>

                <form onSubmit={handleSearch}>
                    <div style={{ margin: '10px', marginLeft: '0px', padding: '10px' }}>
                        <label>Source:</label>
                        <input type="text" value={source} onChange={(e) => setSource(e.target.value)} required />
                    </div>
                    <div style={{ margin: '10px', marginLeft: '0px', padding: '10px' }}>
                        <label>Destination:</label>
                        <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} required />
                    </div>
                    <div style={{ margin: '10px', marginLeft: '0px', padding: '10px' }}>
                        <label>Date:</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required /><br></br>
                    </div>
                    <button type="submit" >Search Buses</button><br></br>
                </form>


                {data.map((route, index) => (
                    <div key={index}>
                        {tripData[index] && tripData[index].map((trip, tripIndex) => (
                            <div className="bus-item" key={tripIndex}>
                                {busData[index] && busData[index].map((bus, busIndex) => (
                                    <div className="bus-details" key={busIndex}>
                                        <div style={{ marginBottom: '10px' }}>
                                            {`Bus Name: ${bus.bus_name}`}<br />
                                            {`Bus Number: ${bus.bus_num}`}<br />
                                            {`Bus Time: ${timechg(trip.tripdate)}`}<br />

                                            {generateSeatButtons(`${bus.tot_seats}`)}
                                            <button on onClick={handleBooking}>Continue</button>
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            );
};

export default BusSearchForm;
