import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link, useParams} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function LeagueDetail() {
  const [selections, setSelections] = useState({});
  const [gameWeeks, setGameWeeks] = useState([]);
  const [league, setLeague] = useState({
    id: null,
    name: '',
    users: []
  });
  const [teams, setTeams] = useState([]);
  const {user} = useStateContext();

  let {id} = useParams();

  useEffect(() => {
    getLeagueDetails();
    getGameWeeks();
    getTeams();
  }, [])

  const getLeagueDetails = () => {
    axiosClient.get(`/leagues/${id}`)
      .then(({ data }) => {
        setLeague(data);
      });
  }

  const getGameWeeks = () => {
    const weeks = [];

    for (let i = 1; i <= 38; i++) {
      weeks.push(`Week ${i}`);
    }
    setGameWeeks(weeks);
  }

  const getTeams = () => {
    const teams = [
      'Man U', 'Arsenal', 'Chelsea', 'Liverpool', 'Man City', 'Spurs', 'Leeds',
      'Everton', 'Aston Villa', 'Newcastle', 'West Ham', 'Southampton', 'Wolves',
      'Crystal Palace', 'Burnley', 'Brighton', 'Fulham', 'West Brom', 'Sheffield Utd'
    ];

    setTeams(teams);
  }


  const handleChange = (user, week, value) => {
    setSelections((prev) => ({
      ...prev,
      [user]: { ...prev[user], [week]: value },
    }));
  };


  return (
<div className="p-6 bg-gray-100 min-h-screen">
  <div className="mb-6">
    <h1 className="text-2xl font-bold">{league.name}</h1>
  </div>

  {/* Wrapper with fixed height and width */}
  <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-4">
    {/* Scroll container with explicit styling */}
    <div style={{
      width: '1000px',
      overflowX: 'scroll',
      display: 'block',
      position: 'relative'
    }}>
      <table style={{ minWidth: '1500px', borderCollapse: 'separate', borderSpacing: 0 }}>
        <thead>
          <tr className="bg-blue-500 text-white text-left">
            <th style={{
              position: 'sticky',
              left: 0,
              zIndex: 20,
              backgroundColor: '#3b82f6', /* Tailwind blue-500 */
              padding: '0.75rem 1.5rem',
              boxShadow: '2px 0 5px -2px rgba(0,0,0,0.2)'
            }}>
              Player
            </th>
            {gameWeeks.map((week) => (
              <th key={week} className="px-6 py-4 border-b">{week}</th>
            ))}
            {/* Additional weeks - truncated for brevity */}
          </tr>
        </thead>
        <tbody>
          {league.users.map((leagueUser, index) => (
            <tr key={user.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td style={{
                position: 'sticky',
                left: 0,
                zIndex: 10,
                backgroundColor: index % 2 === 0 ? '#f9fafb' : 'white',
                padding: '1rem 1.5rem',
                borderBottom: '1px solid #e5e7eb',
                boxShadow: '2px 0 5px -2px rgba(0,0,0,0.2)'
              }}>
                {leagueUser.name}
              </td>
              {gameWeeks.map((week) => (
                <td key={week} className="px-6 py-4 border-b">
                  <select
                    className="border rounded-lg px-3 py-2 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={selections[leagueUser.id]?.[week] || ""}
                    onChange={(e) => handleChange(leagueUser.id, week, e.target.value)}
                    disabled={leagueUser.id != user.id}
                  >
                    <option value="">Select team</option>
                    {teams.map((team) => (
                      <option key={team} value={team}>{team}</option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
  );
}
