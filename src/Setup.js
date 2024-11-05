import React from 'react';
import { Container, Card } from 'react-bootstrap'; // Import Card here
import SideNav from './SideNav'; // Adjust the path as needed
import SetupDataManager from './SetupDataManager'; // Import the SetData component
import BankDataManager from './BankDataManager'; // Import the BankDataManager component

const Setup = () => {
  return (


    <div className="d-flex">
      {/* Side Navigation */}
      <div className="sidebar-wrapper">
        <SideNav />
      </div>
      {/* Main Content */}
      <div className="main-content flex-grow-1">
      <Container className="mt-6">
          {/* <h2>Setup</h2> */}
          <Card>
            <Card.Header className="bg-primary text-white text-center">
              

              <h3 className="text-center">Setup Configuration</h3>
              
              </Card.Header>
            <Card.Body>
            <BankDataManager /> {/* Render the BankDataManager component */}
              <SetupDataManager /> {/* Render the SetupDataManager component */}
         
            
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>






  );
};

export default Setup;
