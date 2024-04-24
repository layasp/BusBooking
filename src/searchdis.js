import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RouteGet() {const [data,setData] = useState('');

useEffect(() => {
    
  fetch('http://localhost:3001/api/getroutes')
    .then((response) => response.json())
    .then((d) => setData(d))
    .catch((error) => console.error('Error fetching data:', error));
}, []);

return (
  <div className='RouteGet'>
    <h2>ReactJS</h2>
    <ul>
      {Object.keys(data).map((key) => (
        <li key={key}>{`${data[key].origin} to ${data[key].destination}`}</li>
      ))}
    </ul>
  </div>
);
}

export default RouteGet;