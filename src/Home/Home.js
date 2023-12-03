import './Home.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Searchbox from '../SearchFilter/Searchbox';
import Filter from '../SearchFilter/Filter';
import PaginationComponent from '../Pagination/PaginationComponent';
import { Link } from 'react-router-dom';



function Home() {
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredoptions, setFilteredoptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    fetchUsers();
  }, [currentPage]); 

  
  let fetchUsers = async (page) => {

    try {
        
        let userData = await axios.get(`https://assignment-backend-h2gm.onrender.com/user/users?page=${page}`)
      
        const { users, totalPages} = userData.data;
        setUsers(users)
        setTotalPages(totalPages);
     
        setFilteredProducts(userData.data);
        setLoading(false);
        console.log(userData.data);
    } catch (error) {
        console.log('error')
    }}


  const handleFilters = async (selectedFilters) => {
    try {
      const response = await axios.get('https://assignment-backend-h2gm.onrender.com/user/filter', {
        params: selectedFilters,
      });
      setFilteredoptions(response.data);
    } catch (error) {
      console.error('Error fetching filtered users:', error);
    }
  };

    const handleSearch = async (query) => {
      setSearchQuery(query);
      try {
        const response = await axios.get(`https://assignment-backend-h2gm.onrender.com/user/search?query=${query}`);
        setFilteredUsers(response.data);
       
        console.log(response.data.length)
      } catch (error) {
        console.log('Error searching users:', error);
      }
    };
  
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchUsers(pageNumber);
  };
 
  let handledelete = async (userdata) => {

    try {
        const confirm = window.confirm("Are u sure?")
        if (confirm) {

            await axios.delete(`https://assignment-backend-h2gm.onrender.com/user/users/${userdata}`)
            alert('User deleted')
           fetchUsers()
        }
    }
    catch (error) {
        console.log(error)
        alert("Something went wronmg")
    }


}

  return (
   
    <div className="container">
      
      <div className="row">
      <div className="col-lg-6">
      <div className="search-filter-container">
        <Searchbox handleSearch={handleSearch} />
        <Filter handleFilters={handleFilters} />
       </div>
       </div>
       <div className="col-lg-6 d-flex justify-content-end" >
     <Link to='/user/createuser'>  <button className="btn btn-danger btn-sm"style={{height:"40px"}}> Add User </button></Link>
     <Link to='/team/createteam'>  <button className="btn btn-success btn-sm ml-3"style={{height:"40px"}}> Create Team </button></Link> 
       </div>
       </div>
     <br/>
       {loading ? (
        <div className="text-center" style={{fontSize:"30px",fontFamily:"cursive"}}>Loading...</div>
      ) : 
    filteredProducts.length === 0 ? (
        <p className="text-center">No records found</p>
      ) : (
        <>
        <div className="row">
          
        {searchQuery ? filteredUsers.length === 0 ? (
          <p className="text-center">No records found</p>
        ) : (
            filteredUsers.map((user) => (
          <div key={user._id} className="col-lg-4 mb-4">
                <div className="card h-100">
              <img src={user.avatar} className="card-img-top" alt={user.first_name} style={{width:"100px"}} />
              <div className="card-body">
             
    
              <h5 className="key">First Name: <span className="value">{user.first_name}</span></h5>
    

    <h5 className="key">Last Name: <span className="value">{user.last_name}</span></h5>
    
    <h6 className="key">Email: <span className="value">{user.email}</span></h6>
    

    <h5 className="key">Gender: <span className="value">{user.gender}</span></h5>
   
    <h5 className="key">Domain: <span className="value">{user.domain}</span></h5>
    
                                                                 
    <h5 className="key">Available: <span className="value">{user.available}</span></h5>
    

   
              
                <div className="d-flex justify-content-between align-items-center mt-3">
  
 
</div>

              </div>
              


              </div>
        </div>
            ))
          ) : filteredoptions.length > 0 ? (
            filteredoptions.map((user) => (
              <div key={user._id} className="col-lg-4 mb-4">
              <div className="card h-100">
            <img src={user.avatar} className="card-img-top" alt={user.first_name} style={{width:"100px"}} />
            <div className="card-body">
           
  
            <h5 className="key">First Name: <span className="value">{user.first_name}</span></h5>
  

  <h5 className="key">Last Name: <span className="value">{user.last_name}</span></h5>
  
  <h6 className="key">Email: <span className="value">{user.email}</span></h6>
  

  <h5 className="key">Gender: <span className="value">{user.gender}</span></h5>
 
  <h5 className="key">Domain: <span className="value">{user.domain}</span></h5>
  
                                                               
  <h5 className="key">Available: <span className="value">{user.available}</span></h5>
  

  
            </div>
            


            </div>
      </div>
            ))
          ) :
          ( users.map((user) => (
            <div key={user._id} className="col-lg-4 mb-4">
              <div className="card h-100">
              <img src={user.avatar} className="card-img-top" alt={user.first_name} style={{width:"100px"}} />
              <div className="card-body">
             
    
              <h5 className="key">First Name: <span className="value">{user.first_name}</span></h5>
    

    <h5 className="key">Last Name: <span className="value">{user.last_name}</span></h5>
    
    <h6 className="key">Email: <span className="value">{user.email}</span></h6>
    

    <h5 className="key">Gender: <span className="value">{user.gender}</span></h5>
   
    <h5 className="key">Domain: <span className="value">{user.domain}</span></h5>
    
                                                                 
    <h5 className="key">Available: <span className="value">{user.available}</span></h5>
    

   
              
               
  
                <Link to={`/user/viewuser/${user._id}`} className='btn btn-secondary btn-sm mr-1'>View</Link>
                                                        <Link to={`/user/edituser/${user._id}`} className='btn btn-success btn-sm mr-1'>Edit</Link>
                                                        <button onClick={() => {
                                                            handledelete(user._id)
                                                        }} className='btn btn-danger btn-sm mr-1'>Delete</button>



              </div>
              


              </div>
              
            </div>
          )))}
      
          
        </div>
        {!searchQuery && (
            <div className="d-flex justify-content-center mt-4 ">
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          )}
          </>
        
      )}
       
    
         
      
     
    </div>
    
    
  );
}

export default Home;
