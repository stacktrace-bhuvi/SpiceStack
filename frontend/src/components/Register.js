import React, { useState } from 'react';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../sweetalert-custom.css';


export default function Register({ setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await register({ name, email, password });

      if (data.token) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'You can now log in to your account 🎉',
          confirmButtonColor: '#5c3d2e'
        }).then(() => {
          navigate('/login'); // redirect after alert closes
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Registration failed. Please try again.'
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong! Please check your details.'
      });
    }
  };

  return (
    <div className="card">
      <h3 style={{ color: "#5c3d2e", marginBottom: "15px" }}>Create an Account</h3>
      <form onSubmit={submit}>
        <input className="input" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="button" type="submit">Register</button>
      </form>
    </div>
  );
}
