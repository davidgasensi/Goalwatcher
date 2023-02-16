import { useState, useEffect } from 'react';
import { getStatsPlayers } from '@services/statsAll.js';
import { getPlayers } from '@services/players.js';

function StatsIndex() {
  const [statsWithImages, setStatsWithImages] = useState([]);

  fetch("https://dog.ceo/api/breeds/image/random")
  .then((response) => response.json())  
	.then((dog) => console.log(dog));

   fetch("https://goalwatcher.davidasensi.workers.dev/leaderboard", {
      'method': 'GET',
      'headers': {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET'

      }})
      .then((response) => response.json())
      .then((dog) => setStatsWithImages(dog));

  return (
    <div className="overflow-x-auto">
      
        <table className="table table-compact w-full table-zebra">
          <thead>
            <tr>
              <th className="text-center bg-gw-grey text-gw-white text-2xl" colSpan="3">
                Pichichi
              </th>
            </tr>
            <tr className="text-center">
              <th className="bg-gw-red text-gw-white text-center">Pos</th>
              <td className="bg-gw-red text-gw-white text-center">Nombre</td>
              <td className="bg-gw-red text-gw-white text-center">Goles</td>
            </tr>
          </thead>
          <tbody>
            {statsWithImages.map(({ position, value, name, image }) => (
             
              <tr key={name}>
                <th className="text-center font-bold px-4 py-2">{position}</th>
                <td className="font-semibold">
                  <img className="w-8 h-8" src={image} alt={name} /> {name}
                </td>
                <td className="text-center px-4 py-2">{value}</td>
                <td>{statsWithImages}</td>
              </tr>
            ))}
          </tbody>
        </table>
      
    </div>
  );
}

export default StatsIndex;
