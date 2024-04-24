import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

var user_name = sessionStorage.getItem("user_name");
var selectedSeatId = sessionStorage.getItem("seat_id");
var trip_id = sessionStorage.getItem("trip_id");

const PassengerDetailForm = () => {
    const [passenger_name, setPassenger_name] = useState('');
    const [passenger_age, setPassenger_age] = useState('');
    const [passenger_gender, setPassenger_gender] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
            try {
            const bookingData = {
                user_name: user_name,
                trip_id: trip_id,
                seat_id: selectedSeatId,
                passenger_name: passenger_name,
                passenger_age: passenger_age,
                passenger_gender:passenger_gender
            };

            
            const response = await fetch('http://localhost:3001/api/bookings', {
                method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(bookingData)
            });


            if (!response.ok) {
                throw new Error('Failed to book the seat');
            }
            
            const responseData = await response.json();
            console.log('Booking successful:', responseData);
            alert("booking succesfull");

        } catch (error) {
                console.error('Error booking the seat:', error);
        }
    };

    return (
        <div>
            <h2>Passenger details</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Passenger name:</label>
                    <input type="text" value={passenger_name} onChange={(e) => setPassenger_name(e.target.value)} required />
                </div>
                <div>
                    <label>Passenger age:</label>
                    <input type="text" value={passenger_age} onChange={(e) => setPassenger_age(e.target.value)} required />
                </div>
                <div>
                    <label>Passenger gender:</label>
                    <input type="radio" value={passenger_gender} onChange={(e) => setPassenger_gender(e.target.value)} required />Female
                    <input type="radio" value={passenger_gender} onChange={(e) => setPassenger_gender(e.target.value)} required />Male
                </div>
                <button type="submit">Book</button>
            </form>
        </div>
    );
};

export default PassengerDetailForm;