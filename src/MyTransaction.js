import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


var user_name = sessionStorage.getItem("user_name");


const MyTransactionForm = () => {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [busData, setBusData] = useState([]);
    const [tripData, setTripData] = useState([]);
    const [bookData, setBookData] = useState([]);

    useEffect(() => {
        handleSearch();
    },[]); 

    const handleSearch = async () => {
        //e.preventDefault();
        try {

            const response = await fetch(`http://localhost:3001/api/getBookingTrans?user_name=${user_name}`);

            if (!response.ok) {
                throw new Error('Failed to fetch Route data');
            }
            const newdata = await response.json();
            setData(newdata);


            const tripPromises = newdata.map(async (route) => {
                const tripResponse = await fetch(`http://localhost:3001/api/gettripbyid?trip_id=${route.trip_id}`);
                const newtripData = await tripResponse.json();
                return newtripData;
            });
            const tripResults = await Promise.all(tripPromises);
            setTripData(tripResults);



        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    return (
        <div style={{ padding: "10px", border: "2px solid black", margin: "10px" }}>
            {console.log("-----------------------------------------------------",data)}
            <p>MY TRANSACTIONS</p>
            {data.map((transaction, index) => (
                <div key={index}>
                    {tripData[index] && tripData[index].map((trip, tripIndex) =>
                        <div key={tripIndex}>
                            {`Passenger Name: ${transaction.passenger_name}`}<br />
                            {`Passenger Age: ${transaction.passenger_age}`}<br />
                            {`Passenger Gender: ${transaction.passenger_gender}`}<br />
                            {`Seat : ${transaction.seat_id}`}<br />
                            {`Boarding time : ${trip.tripdate}`}<br /><br /><br />
                        </div>
                    )}

                </div>
            ))}
        </div>

    );
};


export default MyTransactionForm;
