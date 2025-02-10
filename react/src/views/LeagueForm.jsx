import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";

const LeagueForm = () => {
  const navigate = useNavigate();
  const [league, setLeague] = useState({
    id: null,
    name: '',
    code: '',
  })

  const onSubmit = (e) => {
    e.preventDefault();
    axiosClient.post('/leagues', league)
        .then(() => {
          setNotification('League was successfully created')
          navigate('/leagues')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            // setErrors(response.data.errors)
          }
        })
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="card animated fadeInDown">
      <input onChange={ev => setLeague({...league, name: ev.target.value})} placeholder="League Name"/>
      </div>
      <button className="btn">Create</button>
     </form>
  );
};

export default LeagueForm;
