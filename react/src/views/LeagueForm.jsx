import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

const LeagueForm = () => {
  const navigate = useNavigate();
  const [league, setLeague] = useState({
    id: null,
    name: '',
    code: '',
  });
  const [errors, setErrors] = useState(null)
  const {setNotification} = useStateContext()


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
          setErrors(response.data.errors)
        }
      })
  };

  return (
    <>
      <div className="card animated fadeInDown">
        {errors &&
        <div className="alert">
          {Object.keys(errors).map(key => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
        }

        <form onSubmit={onSubmit}>
          <div className="card animated fadeInDown">
          <input onChange={ev => setLeague({...league, name: ev.target.value})} placeholder="League Name"/>
          </div>
          <button className="btn">Create</button>
        </form>
      </div>
    </>
  );
};

export default LeagueForm;
