import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch list of teams from the backend
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:8000/team/teams'); 
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  const handleTeamSelect = (teamId) => {
    navigate(`/team/teamdetails/${teamId}`);
  };

  return (
    <>
     <div className=" d-flex justify-content-end mr-5">
    <Link to='/'>  <button className="btn btn-danger btn-sm ml-5"style={{height:"40px"}}> Back </button></Link>
    <Link to='/team/createteam'>  <button className="btn btn-success btn-sm ml-3"style={{height:"40px"}}> Create Team </button></Link> </div>
    <div style={{ textAlign: 'center' }}>
        
      <h1>Team List</h1>
      < ul style={{ listStyle: 'none', padding: 0 }}>
        {teams.map((team) => (
          <li key={team._id} style={{ margin: '10px 0' }}>
            <button className= "btn btn-success mt-3" onClick={() => handleTeamSelect(team._id)}>{team.teamName}</button>
          </li>
        ))}
      </ul>
   
    </div>
    </>
  );
};

export default TeamList;
