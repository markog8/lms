import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Leagues() {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext()

  useEffect(() => {
    getLeagues();
  }, [])

  const onDeleteClick = league => {
    if (!window.confirm("Are you sure you want to delete this league?")) {
      return
    }
    axiosClient.delete(`/leagues/${league.id}`)
      .then(() => {
        setNotification('League was successfully deleted')
        getLeagues()
      })
  }

  const getLeagues = () => {
    setLoading(true)
    axiosClient.get('/leagues')
      .then(({ data }) => {
        setLoading(false)
        setLeagues(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Leagues</h1>
        <Link className="btn-add" to="/leagues/new">Create League</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Actions</th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" className="text-center">
                Loading...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
            {leagues.map(league => (
              <tr key={league.id}>
                <td>{league.name}</td>
                <td>{league.code}</td>
                <td>
                  <button className="btn-delete" onClick={ev => onDeleteClick(league)}>Delete</button>
                </td>
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}
