import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

export const Login = (props) => {
    const [credential,setCredential]=useState({email:"",password:""});
   let history=useNavigate();
const handleSubmit= async (e)=>{
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
  
        headers: {
          "Content-Type": "application/json"
         
        },
        body:JSON.stringify({email:credential.email,password:credential.password})
      });
      const json=await response.json();
console.log(json);
if(json.success){
localStorage.setItem('token',json.authtoken);
props.showAlert("Successfully Login","success");
history("/");

}
else{
    props.showAlert("Please check your Credentials","danger");
}
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
      }

    return(
      <div className="mt-3">
      <h2>Log in to continue to iNotebook</h2>
        <div className="container">
            <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={ credential.email} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={credential.password} id="password" name="password" onChange={onChange} />
  </div>

  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
        </div>
        </div>
    )
   
}

export default Login;