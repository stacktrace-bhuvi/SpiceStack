import React, { useState } from 'react';
import { register, setAuthToken, getMe } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register({ setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await register({ name, email, password });
      localStorage.setItem('token', data.token);
      setAuthToken(data.token);
      const me = await getMe(data.token);
      setUser(me);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
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
