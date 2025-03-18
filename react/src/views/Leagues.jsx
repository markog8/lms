import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Leagues() {
  const [leagues, setLeagues] = useState([]);
  const [userLeagues, setUserLeagues] = useState([]);
  const [loading, setLoading] = useState(false);
  const {user, setNotification} = useStateContext();

  useEffect(() => {
    getLeagues();
    getUserLeagues();
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

  const onLeaveClick = league => {
    if (!window.confirm("Are you sure you want to leave this league?")) {
      return
    }
    axiosClient.delete(`/user/leagues/${league.id}`)
      .then(() => {
        setNotification('Successfully left league ' + league.name)
        getUserLeagues()
      })
  }

  const onJoinClick = league => {
    axiosClient.post(`/leagues/${league.id}/join`)
      .then(() => {
        setNotification('Successfully joined league ' + league.name)
        getUserLeagues();
      })
  }

  const getLeagues = () => {
    setLoading(true)
    axiosClient.get('/leagues')
      .then(({ data }) => {
        setLoading(false)
        setLeagues(data.data)
        console.log(data.data);
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const getUserLeagues = () => {
    setLoading(true)
    axiosClient.get('/user/leagues')
      .then(({ data }) => {
        setLoading(false)
        setUserLeagues(data.data)
        console.log(data.data);
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
              {leagues
                .filter(league => !userLeagues.some(userLeague => userLeague.id === league.id))
                .map(league => (
                  <tr key={league.id}>
                    <td>{league.name}</td>
                    <td>{league.code}</td>
                    <td>
                      <button className="btn-add" onClick={ev => onJoinClick(league)}>Join</button>
                      &nbsp;
                      <button className="btn-delete" onClick={ev => onDeleteClick(league)}>Leave</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          }
        </table>
      </div>

      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>My Leagues</h1>
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
              {userLeagues.map(league => (
                  <tr key={league.id}>
                    <td>{league.name}</td>
                    <td>{league.code}</td>
                    <td>
                    <button className="btn-add">View</button>
                      &nbsp;
                      <button className="btn-delete" onClick={ev => onLeaveClick(league)}>Leave</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}
