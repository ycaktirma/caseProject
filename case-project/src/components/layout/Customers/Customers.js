import { CustomTable } from '../../shared/CustomTable/CustomTable';
import { TitleWithTextCentered } from '../../shared/TitleWithText/TitleWithTextCentered';
import React, { useState, useEffect } from 'react';
import { httpGet, httpPost, httpDelete } from "../../../services/HttpService";
import './Customers.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export function Customers(){
    
    //Customers data
    const [customers, setCustomers] = useState([]);

    //Add customer modal states and callbacks
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const customersTableConfig =
    {
        noDataText : "Müşteri bulunamadı.",
        columnNames: ['id', 'name', 'surname', 'email', 'voting', 'type'],
        showDelete: true
    }

    //Delete customer callback
    const handleDeleteSuccess = (id) => {
        httpDelete('http://localhost:8000/customer/',id).then(response=>{
            console.log("Succesfully deleted");
            //Update list
            httpGet('http://localhost:8000/customer/').then(response=>{
                setCustomers(response.data);
            }).catch(error=>{
                console.log("Error fetching customers", error);
            })
          }).catch(error=>{
            console.log("Error deleting customer", error);
        })
    };

    //Add customer submit callback
    const handleAddCustomerSubmit = (e) =>{
        e.preventDefault();

        // Access the form data
        const formData = {
            name: e.target.elements.name.value,
            surname: e.target.elements.surname.value,
            email: e.target.elements.email.value,
            voting: e.target.elements.voting.value,
            type: e.target.elements.type.value,
        };
  
      // TODO: Client side form validation here

      httpPost('http://localhost:8000/customer/', formData).then(response=>{
        //Successful post
        //Update list
        httpGet('http://localhost:8000/customer/').then(response=>{
            setCustomers(response.data);
            //Close the modal after updating the ui
            setShow(false);
        }).catch(error=>{
            console.log("Error fetching customers", error);
        })

    }).catch(error=>{
        console.log("Error adding customer", error);
    })
      console.log('Form Data:', formData);
    }

    useEffect(() => {
      // Fetch customers when the component mounts
      httpGet('http://localhost:8000/customer/').then(response=>{
        setCustomers(response.data);
      }).catch(error=>{
        console.log("Error fetching customers", error);
      })
    }, []);

    
    return(
        <>
        <div className='container customers'>
            <TitleWithTextCentered title={"Müşteriler"} text={"Müşterileri listeleyin ve işlem yapın."}></TitleWithTextCentered>
            <div className='d-flex flex-row-reverse my-2'>
                <Button variant="primary" onClick={handleShow}>
                    Add Customer
                </Button>            
            </div>

            <CustomTable onDeleteSuccess={handleDeleteSuccess} data={customers} config={customersTableConfig}></CustomTable>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                
                    <Form onSubmit={handleAddCustomerSubmit}>

                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name='name' type="text" placeholder="Enter name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formSurname">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control name='surname' type="text" placeholder="Enter surname" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name='email' type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formVoting">
                            <Form.Label>Voting</Form.Label>
                            <Form.Control name='voting' type="number" step={'0.01'} placeholder="Enter voting" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formType">
                            <Form.Label>Type</Form.Label>
                            <Form.Control name='type' type="text" placeholder="Enter type" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                
                </Modal.Body>
            </Modal>
        </div>
        </>
    );
}