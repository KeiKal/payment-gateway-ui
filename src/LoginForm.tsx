import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface LoginData {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', loginData);
      console.log('Login Success:', response.data.user);

      const { id, is_admin } = response.data.user;

      navigate('/dashboard', { state: { id, is_admin } });
    } catch (error) {
      console.error('Login Error:', error);
    }
  };


  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <InputGroup>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={loginData.username}
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />
        </InputGroup>
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* full viewport height */
  background-color: #f0f0f0; /* optional background color */
`;

const Form = styled.form`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export default LoginForm;
