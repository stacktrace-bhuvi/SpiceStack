import React, { useState } from 'react';
import { login, setAuthToken, getMe } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../sweetalert-custom.css';

export default function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      localStorage.setItem('token', data.token);
      setAuthToken(data.token);
      const me = await getMe(data.token);
      setUser(me);

      Swal.fire({
        icon: 'success',
        title: 'Welcome Back!',
        text: `You’ve successfully logged in, ${me.name || 'User'} 🎉`,
        confirmButtonText: 'Let’s Go!',
        showConfirmButton: true,
        customClass: {
          popup: 'swal2-popup',
          confirmButton: 'swal2-confirm'
        }
      }).then(() => {
        navigate('/');
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Please check your email or password and try again.',
        confirmButtonText: 'Retry',
        customClass: {
          popup: 'swal2-popup',
          confirmButton: 'swal2-confirm'
        }
      });
    }
  };

  return (
    <div className="card">
      <h3 style={{ color: "#5c3d2e", marginBottom: "15px" }}>Login</h3>
      <form onSubmit={submit}>
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="button" type="submit">Login</button>
      </form>
    </div>
  );
}
