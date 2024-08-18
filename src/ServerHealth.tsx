import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ServerHealth: React.FC = () => {
  const [healthData, setHealthData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServerHealth = async () => {
      try {
        const response = await axios.get('http://localhost:3000/server');
        setHealthData(response.data);
      } catch (err) {
        setError('Failed to fetch server health.');
        console.error('Server Health Error:', err);
      }
    };

    fetchServerHealth();
  }, []);

  return (
    <Container>
      <Header>
        <h1>Server Health Status</h1>
      </Header>
      <Content>
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : healthData ? (
          <HealthDetails>
            <h2>Server Health Information</h2>
            <p><strong>Status:</strong> {healthData.status}</p>
            <p><strong>Uptime:</strong> {healthData.uptime}</p>
            <p><strong>Memory Usage:</strong> {healthData.memoryUsage} MB</p>
          </HealthDetails>
        ) : (
          <LoadingMessage>Loading server health data...</LoadingMessage>
        )}
      </Content>
      <Footer>
        <Button onClick={() => window.location.reload()}>Refresh</Button>
      </Footer>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f4f8;
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: -40px;
`;

const Footer = styled.footer`
  padding: 20px;
  text-align: center;
  background-color: #f8f9fa;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #0056b3;
  }
`;

const HealthDetails = styled.div`
  text-align: center;

  h2 {
    margin-bottom: 15px;
  }

  p {
    margin: 5px 0;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

const LoadingMessage = styled.p`
  color: #333;
`;

export default ServerHealth;
