import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link, useParams} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function LeagueDetail() {
  const [selections, setSelections] = useState({});
  const [league, setLeague] = useState({
    id: null,
    name: '',
    users: []
  });
  let {id} = useParams();

  useEffect(() => {
    getLeagueDetails();
  }, [])

  const getLeagueDetails = () => {
    axiosClient.get(`/leagues/${id}`)
      .then(({ data }) => {
        setLeague(data);
      });
  }

  const handleChange = (user, week, value) => {
    setSelections((prev) => ({
      ...prev,
      [user]: { ...prev[user], [week]: value },
    }));
  };


  return (
    <div className="overflow-x-auto p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div>
        {league.name}
      </div>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white text-left">
              <th className="px-6 py-3 rounded-tl-lg">Player</th>
              <th className="px-6 py-3">Week 1</th>
              <th className="px-6 py-3">Week 2</th>
              <th className="px-6 py-3 rounded-tr-lg">Week 3</th>
            </tr>
          </thead>
          <tbody>
            {league.users.map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="px-6 py-4 border-b">{user.name}</td>
                {["Week 1", "Week 2", "Week 3"].map((week) => (
                  <td key={week} className="px-6 py-4 border-b">
                    <select
                      className="border rounded-lg px-3 py-2 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={selections[user.id]?.[week] || ""}
                      onChange={(e) => handleChange(user.id, week, e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Man U">Man U</option>
                      <option value="Arsenal">Arsenal</option>
                    </select>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
