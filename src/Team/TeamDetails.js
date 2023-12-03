import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const TeamDetails = () => {
  const [teamDetails, setTeamDetails] = useState({});
  const [usersData, setUsersData] = useState([]);
  const params= useParams();

  useEffect(() => {
    // Fetch team details from the backend
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/team/teamdetails/${params.id}`); 
        setTeamDetails(response.data);
        setUsersData(response.data.users); 
      } catch (error) {
        console.error('Error fetching team details:', error);
      }
    };

    fetchTeamDetails();
  }, []);

  return (
    <>
     <div className=" d-flex justify-content-end mr-3">
    <Link to='/team/teamlist'>  <button className="btn btn-danger btn-sm ml-5"style={{height:"40px"}}> Back </button></Link>
    <Link to='/team/createteam'>  <button className="btn btn-success btn-sm ml-3"style={{height:"40px"}}> Create Team </button></Link> </div>
    <div style={{ textAlign: 'center' }}>
      <h1 style={{fontFamily:"cursive",color:"black"}}>Team Details</h1>
      <h2 style={{fontFamily:"cursive",color:"tomato"}}>Team Name: {teamDetails.teamName}</h2>
      <h3>Users:</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {usersData.map((user) => (
              <div className="container">
                   <div className="row justify-content-center">
              <div key={user._id} className="col-lg-4 mb-4">
              
              <div className="card h-100">
           
            <div className="card-body">
           
  
            <h5 className="key">First Name: <span className="value">{user.first_name}</span></h5>
  

  <h5 className="key">Last Name: <span className="value">{user.last_name}</span></h5>
  
  <h6 className="key">Email: <span className="value">{user.email}</span></h6>
  

  <h5 className="key">Gender: <span className="value">{user.gender}</span></h5>
 
 
  

  </div>
            
             

            </div>
            
</div>

            </div>
      </div>
          
        ))}
      </ul>
    </div>
   </>
  );
};

export default TeamDetails;
