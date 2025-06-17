import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import fullWidthImage from '../assets/bg.png'; 


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
  background: rgba(44, 62, 80, 0.5); /* Slightly dark and transparent */
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.3);
  padding: 50px 40px;
  width: 100%;
  max-width: 420px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #ecf0f1;
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
  transition: 0.3s ease-in-out;

  &:hover {
    background: linear-gradient(135deg, #6dd5fa, #2980b9);
  }
`;

const LinkText = styled.p`
  margin-top: 18px;
  font-size: 1rem;
  color: #ecf0f1;

  a {
    color: #6dd5fa;
    font-weight: 500;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      return alert('Passwords do not match!');
    }

    try {
      const res = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // <-- important for cookies (if used)
        body: JSON.stringify({ name: username, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        alert('Signup successful!');
        console.log('User:', data.user);
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('Something went wrong in signup. Please try again.');
    }
  };

  return (
    <Background>
      <Card>
        <Title>Create an Account</Title>
        <form onSubmit={handleSignup}>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <Button type="submit">Sign Up</Button>
        </form>
        <LinkText>
          Already have an account? <Link to="/login">Log in</Link>
        </LinkText>
      </Card>
    </Background>
  );
};

export default SignupPage;
