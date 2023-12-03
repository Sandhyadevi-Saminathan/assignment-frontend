import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'


function Sidebar() {
    return (
        <>
            <ul 
               
                  className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion static-top shadow"
                  id="accordionSidebar"
                  style={{ marginTop: '0' }}
                  >

                <div className="sidebar-brand d-flex align-items-center justify-content-center" href="" style={{ fontSize: "20px", color: "black" }}  >  </div>
                <br />
                {/* <!-- Divider --> */}
                <hr className="sidebar-divider my-0 " />

                <li className="nav-item active">
                    <Link className="nav-link" to="/" onClick={() => {
                      
                    }}>
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span style={{ fontSize: "17px" }}>User List</span></Link>
                </li>
                
                <li className="nav-item active">
                    <Link className="nav-link" to="/team/teamlist" onClick={() => {
                       
                    }}>
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span style={{ fontSize: "17px" }}>Team List</span></Link>
                </li>

              
              
             
               
              
            </ul >





        </>
    )
}

export default Sidebar