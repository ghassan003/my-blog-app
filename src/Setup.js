import React from 'react';
import { Container, Card } from 'react-bootstrap'; // Import Card here
import SideNav from './SideNav'; // Adjust the path as needed
import SetupDataManager from './SetupDataManager'; // Import the SetData component
import BankDataManager from './BankDataManager'; // Import the BankDataManager component

const Setup = () => {
  return (
    <div className="d-flex">
      <SideNav /> {/* Render the SideNav component */}
      <div className="main-content">
        <Container className="mt-5">
          {/* <h2>Setup</h2> */}
          <Card>
            <Card.Header className="bg-primary text-white text-center">
              

              <h3 className="text-center">Setup Configuration</h3>
              
              </Card.Header>
            <Card.Body>
              <SetupDataManager /> {/* Render the SetupDataManager component */}
         
              <BankDataManager /> {/* Render the BankDataManager component */}
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default Setup;
