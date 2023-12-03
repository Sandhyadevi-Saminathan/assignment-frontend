import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Viewuser() {
   
    const [isloading, setloading] = useState(true)
    const [user, setuser] = useState([])
    const params = useParams();
    useEffect(() => {
        getuser()
    }, [])
    let getuser = async () => {
        try {
            const datas = await axios.get(`http://localhost:8000/user/users/${params.id}`);
            setuser(datas.data)
            console.log(datas.data)
            setloading(false)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {isloading ? (
                <div class="col d-flex justify-content-center">
                    <h1>Loading</h1>
                </div>

            )
                :
                <div class="col d-flex justify-content-center">
                    <div class="card text-white mb-3" style={{ width: "30rem" }}>
                    <div className="card h-100">
              <img src={user.avatar} className="card-img-top" alt={user.first_name} style={{width:"100px"}} />
              <div className="card-body">
             
    
              <h5 className="key">First Name: <span className="value">{user.first_name}</span></h5>
    

    <h5 className="key">Last Name: <span className="value">{user.last_name}</span></h5>
    
    <h6 className="key">Email: <span className="value">{user.email}</span></h6>
    

    <h5 className="key">Gender: <span className="value">{user.gender}</span></h5>
   
    <h5 className="key">Domain: <span className="value">{user.domain}</span></h5>
    
                                                                 
    <h5 className="key">Available: <span className="value">{user.available}</span></h5>
    
                            
                                    <th>
                                        <Link to={`/user/edituser/${user._id}`} className="btn btn-danger mr-2 mt-2">Edit</Link>
                                        <Link to={`/`} className='btn btn-danger mr-2 mt-2'>Back</Link>
                                    </th>
                               


                        </div>
                    </div>
                </div >
                </div>
            }
        </>
    )
}

export default Viewuser