import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Card, Button, Figure, Image} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
// import { Document } from 'react-pdf';

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Home({ yourLocalBalance, readContracts }) {
  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract
  const purpose = useContractReader(readContracts, "YourContract", "purpose");

  return (
    <div>
      <div className="jumbotron">
        <h1 className="display-4">Hello, blockchain!</h1>
        <p className="lead">The DAPP to verify the ownership</p>
        <hr className="my-4"/>
        <p>We make life easier</p>
        <p className="lead">
          <a className="btn btn-primary btn-lg" href="#" role="button">Check our Youtube introduction</a>
        </p>
      </div>
      <div className="container">
        <div className="row justify-content-around">
          <div className="col">
            <Doc name="Ownership Certification" target="oc"/>
          </div>
          <div className="col">
            <Doc name="Rental Agreement" target="ra"/>
          </div>
          <div className="col">
            <Doc name="Ownership Certification" target="oc"/>
          </div>
        </div>
        <div className="row justify-content-around">
          <div className="col">
            <Doc name="Rental Agreement" target="ra"/>
          </div>
          <div className="col">
            <Doc name="Ownership Certification" target="oc"/>
          </div>
          <div className="col">
            <Doc name="Rental Agreement" target="ra"/>
          </div>
      </div>
    </div>
    <div className="row">
      <footer className="bg-light text-center text-lg-start">
        <div className="text-center p-3">
          <a className="text-dark" href="https://ethtoronto.ca">ETHToronto Competition</a>
        </div>
      </footer>
    </div>

  
  </div>
  );
}

export default Home;


function Doc(props){
  return(
    <Card style={{ width: '20rem' }}>
        <Card.Img variant="top" src={"/doc/"+ props.target + ".png"} />
        <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
            {props.description}
        </Card.Text>
        <QR title="Dear user, please scan the QR Code on your phone" content="/doc/qr-code.png"/>
        </Card.Body>
  </Card>
  );
}

function QR(props){
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <> 
    <Button variant="primary" onClick={handleShow}>Scan QR Code</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            width="100%"
            height="100%"
            alt="171x180"
            src={props.content}
            id={props.title}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fail QR Code Validation - The window will close with a notification
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Successfully Validation - Present full documentation on user's phone
          </Button>
        </Modal.Footer>
      </Modal>
    </>    
  );
}
