import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import styled from 'styled-components';

interface RegistrationData {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  is_admin: boolean;
}

const RegistrationForm: React.FC = () => {
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    is_admin: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setRegistrationData({
      ...registrationData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/register', registrationData);
      console.log('Registration Success:', response.data);
    } catch (error) {
      console.error('Registration Error:', error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <InputGroup>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={registrationData.first_name}
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup>
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={registrationData.last_name}
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={registrationData.username}
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={registrationData.password}
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup>
          <label>Admin:</label>
          <input
            type="checkbox"
            name="is_admin"
            checked={registrationData.is_admin}
            onChange={handleChange}
          />
        </InputGroup>
        <Button type="submit">Register</Button>
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

export default RegistrationForm;
