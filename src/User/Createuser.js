import React from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Createuser() {
    const navigate = useNavigate()
    const [isloading, setloading] = useState(false)
    const formik = useFormik({
        initialValues: {
            email: "",
            first_name: "",
            last_name: "",
            domain: "",
            gender: "",
            available:"",
            avatar:""

        },
        validate: (values) => {
            let error = {}
            if (!values.first_name) {
                error.first_name = "Please enter First Name";
            } else if (values.first_name.length <= 3) {
                error.first_name = "Please enter valid First Name"
            }
            if (!values.last_name) {
                error.last_name = "Please enter Last Name";
            }
            if (!values.email) {
                error.email = "Email is required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                error.email = "Enter a valid email"
            }

            if (!values.domain) {
                error.domain = "Please enter your domain";
            }
            if (!values.gender) {
                error.gender = "Please select the option";
            } if (!values.available) {
                error.available = "Please select the option";
            }
            if (!values.avatar) {
                error.avatar = "Please give the image url";
            }
            return error;
        },
        onSubmit: async (values) => {
            try {

                setloading(true)
                let userData = await axios.post("http://localhost:8000/user/users", values);
                alert("User Created");
                formik.resetForm();
                navigate("/");
            } catch (error) {
                console.log(error)
            }
            console.log(values)
        }

    })

    return (

        <div className='container' >
            <form onSubmit={formik.handleSubmit} style={{fontFamily:"cursive",fontSize:"20px",color:"black"}}>
                <div className='row ml-1'>
                    <div className='form-group col-lg-4'>
                        <label >First Name</label>
                        <input className={`form-control ${formik.errors.first_name ? "is-invalid" : "is-valid"} `}
                            name='first_name'
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.first_name}
                        ></input>
                        <span style={{ color: "red" }}>{formik.errors.first_name}</span>
                    </div>
                    <div className='form-group col-lg-4'>
                        <label>Last Name</label>
                        <input className={`form-control ${formik.errors.last_name ? "is-invalid" : "is-valid"} `}
                            name='last_name'
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.last_name}
                        ></input>
                        <span style={{ color: "red" }}>{formik.errors.last_name}</span>
                    </div>
                </div>
                <div className='row ml-1'>
                <div className='form-group col-lg-4'>
                    <label>Email</label>
                    <input className={`form-control ${formik.errors.email ? "is-invalid" : "is-valid"} `}

                        name='email'
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        placeholder='Enter Your Email'></input>
                    <span style={{ color: "red" }}>{formik.errors.email}</span>
                </div>
                
                <div className='form-group col-lg-4'>
                    <label>Domain</label>
                    <input className={`form-control ${formik.errors.domain ? "is-invalid" : "is-valid"} `}
                        name='domain'
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.domain}
                        placeholder='Sales/Finance/Marketing/IT/Management'></input>
                    <span style={{ color: "red" }}>{formik.errors.domain}</span>
                </div>


              
</div>
<div className='row ml-1'>           
<div className='form-group col-lg-4'>
  <label>Gender</label>
  <div>
    <label style={{ marginRight: "30px",fontFamily:"cursive",fontSize:"20px",color:"royalblue"}}>
      <input
        type="radio"
        name="gender"
        value="male"
        checked={formik.values.gender === "male"}
        onChange={formik.handleChange}
        
        className={`form-check-input ${formik.errors.gender ? "is-invalid" : "is-valid"}`}
      />
      Male
    </label>
   
    <label style={{ marginRight: "30px",fontFamily:"cursive",fontSize:"20px",color:"royalblue"}}>
      <input
        type="radio"
        name="gender"
        value="female"
        checked={formik.values.gender === "female"}
        onChange={formik.handleChange}
        className={`form-check-input ${formik.errors.gender ? "is-invalid" : "is-valid"}`}
      />
      Female
    </label>
    <br/>
    <span style={{ color: "red" }}>{formik.errors.gender}</span>
  </div>
</div>  



                <div className='form-group col-lg-4'>
  <label>Available</label>
  <div>
    <label style={{ marginRight: "30px",fontFamily:"cursive",fontSize:"20px",color:"royalblue"}}>
      <input
        type="radio"
        name="available"
        value="true"
        checked={formik.values.available === "true"}
        onChange={formik.handleChange}
        className={`form-check-input ${formik.errors.available ? "is-invalid" : "is-valid"}`}
      />
     true
    </label>
   
    <label style={{ marginRight: "30px",fontFamily:"cursive",fontSize:"20px",color:"royalblue"}}>
      <input
        type="radio"
        name="available"
        value="false"
        checked={formik.values.available === "false"}
        onChange={formik.handleChange}
        className={`form-check-input ${formik.errors.available ? "is-invalid" : "is-valid"}`}
      />
      false
    </label>
    <br/>
    <span style={{ color: "red" }}>{formik.errors.available}</span>
  </div>
</div>
</div>
<div className='form-group col-lg-4'>
                        <label>Avatar</label>
                        <input className={`form-control ${formik.errors.avatar ? "is-invalid" : "is-valid"} `}
                            name='avatar'
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.avatar}
                        ></input>
                        <span style={{ color: "red" }}>{formik.errors.avatar}</span>
                    </div>
                <div className='row ml-1'>
                    <div className='form-group col-lg-2'>


                        <button type='Submit' className='btn btn-primary rounded col-lg-12 justify-content-center align-items-center mt-2'>Add User</button>
                    </div>
                    <div className='form-group col-lg-2'>
                        <Link to={'/'}> <button type='button' className='btn btn-success rounded col-lg-12 justify-content-center align-items-center mt-2'>Back</button></Link>
                    </div><hr />
                </div>
            </form>
        </div >
    )
}

export default Createuser