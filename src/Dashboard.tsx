import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  is_admin: boolean;
}

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve id and is_admin from location state or sessionStorage
  const { id, is_admin } = location.state as UserDetails || {
    id: sessionStorage.getItem('userId'),
    is_admin: sessionStorage.getItem('isAdmin') === 'true',
  };

  const [userDetails, setUserDetails] = React.useState<UserDetails | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${id}`);
        setUserDetails(response.data);
      } catch (err) {
        setError('Unauthorized access');
      }
    };

    if (id) {
      fetchUserDetails();
    } else {
      setError('User ID not found');
    }
  }, [id]);

  const handleHealthCheck = async () => {
    try {
      const response = await axios.get('http://localhost:3000/server');
      alert(`Server Health: ${response.data.status}`);
    } catch (error) {
      console.error('Server Health Check Error:', error);
    }
  };

  return (
    <Container>
      <Header>
        <h1>Dashboard</h1>
      </Header>
      <Content>
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : userDetails ? (
          <UserDetailsContainer>
            <h2>Welcome, {userDetails.first_name} {userDetails.last_name}</h2>
            <p><strong>Username:</strong> {userDetails.username}</p>
            <p><strong>Admin:</strong> {userDetails.is_admin ? 'Yes' : 'No'}</p>
          </UserDetailsContainer>
        ) : (
          <LoadingMessage>Loading user details...</LoadingMessage>
        )}
      </Content>
      <Footer>
        <Button onClick={() => navigate('/')}>Logout</Button>
        <Button onClick={handleHealthCheck}>Check Server Health</Button>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const Header = styled.header`
  background-color: #007bff;
  width: 100%;
  padding: 20px;
  text-align: center;
  color: white;
`;

const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  margin-top: -40px;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  background-color: #f1f1f1;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const UserDetailsContainer = styled.div`
  text-align: center;

  h2 {
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 5px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

const LoadingMessage = styled.p`
  color: #333;
`;

export default Dashboard;
