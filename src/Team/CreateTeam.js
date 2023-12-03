import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateTeam = () => {
  const [domain, setDomain] = useState('');
  const [availability, setAvailability] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [teamName, setTeamName] = useState('');
  const navigate = useNavigate();

  const fetchUsersByCriteria = async () => {
    try {
      const response = await axios.get(`https://assignment-backend-h2gm.onrender.com/user/filter`, {
        params: {
          domain,
          availability,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  useEffect(() => {
    console.log(selectedUsers);
  }, [selectedUsers]);

  useEffect(() => {
    if (domain && availability) {
        fetchUsersByCriteria();
      }

  }, [domain, availability]);

  const handleDomainChange = (event) => {
    setDomain(event.target.value);
  };

  const handleAvailabilityChange = (event) => {
    setAvailability(event.target.value);
  };

  
  const handleUserSelect = (userId) => {
    setSelectedUsers(prevSelectedUsers => {
      const alreadySelected = prevSelectedUsers.includes(userId);
      if (alreadySelected) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
      
    });
  };

  const handleAddToTeam = async() => {
    if (selectedUsers.length === 0) {
        alert('Please select at least one user for the team.');
        return;
      }
      let enteredTeamName = teamName.trim();
      if (enteredTeamName === '') {
        enteredTeamName = prompt('Please enter the team name:');
        if (enteredTeamName === null || enteredTeamName.trim() === '') {
          // User canceled or entered an empty team name
          return;
        }
      }
      try {
        // Save the team data to the backend
        const teamData = {
          teamName: enteredTeamName,
          users: selectedUsers,
        };
        console.log(teamData)
       const response= await axios.post('https://assignment-backend-h2gm.onrender.com/team/create', teamData);
        const createdTeamId = response.data._id
  
        // Clear selected users and team name after successful creation
        setSelectedUsers([]);
        setTeamName('');
        alert('Team created successfully!');
        navigate(`/team/teamdetails/${createdTeamId}`)
      } catch (error) {
        console.error('Error creating team:', error);
        alert('Failed to create team. Please try again.');
      }
  };

  

  return (
    <div className="container">
   
   <div className="d-flex justify-content-center align-items-center">
        <label>
          Domain:    
          <select value={domain} onChange={handleDomainChange}>
            <option value="">Select Domain</option>
            <option value="IT">IT</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
           
          </select>
        </label>
        <label className='ml-3'>
          Availability:
           <select value={availability} onChange={handleAvailabilityChange}>
            <option value="">Select Availability</option>
            <option value="true">True</option>
            <option value="false">False</option>
           
          </select>
        </label>
      </div>
      <div className="flex justify-content-end" >
      
   <button className="btn btn-success btn-sm ml-3"style={{height:"40px"}} onClick={handleAddToTeam}> Create Team </button>
   <Link to='/'>  <button className="btn btn-danger btn-sm"style={{height:"40px"}}> Back </button></Link>
      </div>
      <div>
      
        <div className="container mt-3">
      
             <div className="row">
        {users.map((user) => (
             
          <div key={user._id} className="col-lg-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
              <h5 className="key">First Name: <span className="value">{user.first_name}</span></h5>
    <h5 className="key">Last Name: <span className="value">{user.last_name}</span></h5>
       <h5 className="key">Domain: <span className="value">{user.domain}</span></h5>                                                                
    <h5 className="key">Available: <span className="value">{user.available}</span></h5>              
    <div className="d-flex justify-content-between align-items-center mt-3">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleUserSelect(user._id)}
                  >
                    {selectedUsers.includes(user._id) ? 'Remove' : 'Add'}
                  </button>
                </div>

              </div>
              </div>
           
            
          </div>
        ))}
          </div>
              


              </div>
      </div>
     
    </div>
  );
};

export default CreateTeam;
