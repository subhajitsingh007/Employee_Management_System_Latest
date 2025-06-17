import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import fullWidthImage from '../assets/bg.png'; // ✅ Correct default import
 // Make sure this path matches your image
import { FiLogIn } from 'react-icons/fi';

const Background = styled.div`
  height: 100vh;
  width: 100%;
  background: url(${fullWidthImage}) no-repeat center center fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  background: rgba(44, 62, 80, 0.5); /* Glass effect with dark tint */
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.3);
  padding: 50px 40px;
  width: 100%;
  max-width: 420px;
  text-align: center;
`;

const Emoji = styled.div`
  font-size: 48px;
  margin-bottom: 10px;
  color: #ecf0f1;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  color: #ecf0f1;
  font-family: 'Segoe UI', sans-serif;
`;

const Subtitle = styled.p`
  margin-bottom: 30px;
  font-size: 14px;
  color: #bdc3c7;
  font-family: 'Segoe UI', sans-serif;
`;

const Input = styled.input`
  width: 95%; /* Slightly smaller than full width */
  padding: 12px 16px;
  margin: 10px 0;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.85);
  transition: 0.3s ease-in-out;

  &:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 8px #3498db66;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #2980b9, #6dd5fa);
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: 0.3s ease-in-out;

  &:hover {
    background: linear-gradient(135deg, #6dd5fa, #2980b9);
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

console.log(data); // ✅ Check if data.token exists

if (response.ok) {
  localStorage.setItem('token', data.token); // ✅ Store token
  localStorage.setItem('user', JSON.stringify(data.user)); // ✅ Store user object

  if (data.user.role === 'admin') {
    navigate('/dashboard');
  } else {
    navigate('/employee-dashboard');
  }

    } else {
      alert(data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Something went wrong in login. Please try again.');
  }
};

  return (
    <Background>
      <Card>
        <Emoji>🧑‍💼</Emoji>
        <Title>Welcome Back</Title>
        <Subtitle>Please log in to continue</Subtitle>
        <form onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">
            <FiLogIn size={20} /> Login
          </Button>
        </form>
      </Card>
    </Background>
  );
};

export default LoginPage;
