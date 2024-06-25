import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Signup = (props) => {
  const [credential, setCredential] = useState({ name: "", email: "", password: "", cpassword: "" });
  let history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credential;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"

      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success===true) {
      localStorage.setItem('token', json.authtoken);
      history("/");
      props.showAlert("Successfully Acount create", "success");
    }
    else {
      props.showAlert("Invalid Credentials", "danger")
    }
  }

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  }
  return (
    <div className="mt-2">
    <h2>Create an Account to use iNotebook</h2>
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name=" password" onChange={onChange} id="password" minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name="cpassword" onChange={onChange} id="cpassword" minLength={5} required />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    </div>
  )
}

export default Signup;

