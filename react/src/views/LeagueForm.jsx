import React, { useState } from 'react';

const LeagueForm = () => {
  const [leagueName, setLeagueName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ leagueName });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card animated fadeInDown">
      <input onChange={ev => setLeagueName(ev.target.value)} placeholder="League Name"/>
      </div>
      <button className="btn">Create</button>
     </form>
  );
};

export default LeagueForm;
