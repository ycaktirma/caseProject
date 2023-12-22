import './Product.css';
import { CustomTable } from '../../shared/CustomTable/CustomTable';
import { TitleWithTextCentered } from '../../shared/TitleWithText/TitleWithTextCentered';
import React, { useState, useEffect } from 'react';
import { httpGet, httpPost, httpDelete } from "../../../services/HttpService";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export function Product(){
    //Product data
    const [products, setProducts] = useState([]);

    //Add product modal states and callbacks
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const productsTableConfig = {
        noDataText: "Ürün bulunamadı.",
        columnNames: ['id','name','waterCost', 'cost', 'customer'],
        showDelete: true
    }

    //Delete customer callback
    const handleDeleteSuccess = (id) => {
        httpDelete('http://localhost:8001/product/',id).then(response=>{
            console.log("Succesfully deleted");

            //Update list
            httpGet('http://localhost:8001/product/').then(response=>{
                setProducts(response.data);
            }).catch(error=>{
                console.log("Error fetching products", error);
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
            waterCost: e.target.elements.waterCost.value,
            cost: e.target.elements.cost.value,
            customer: e.target.elements.customer.value,
        };

        // TODO: Client side form validation here

        httpPost('http://localhost:8001/product/', formData).then(response=>{

            //Successful post
            //Update list
            httpGet('http://localhost:8001/product/').then(response=>{
                setProducts(response.data);
                //Close the modal after updating the ui
                setShow(false);
            }).catch(error=>{
                console.log("Error fetching products", error);
            })
        }).catch(error=>{
            console.log("Error adding product", error);
        })
        console.log('Form Data:', formData);
    }

    useEffect(() => {
        // Fetch customers when the component mounts
        httpGet('http://localhost:8001/product/').then(response=>{
            setProducts(response.data);
        }).catch(error=>{
            console.log("Error fetching products", error);
        })
    }, []);

 
    return(
        <>
        <div className='container products'>
            <TitleWithTextCentered title={"Ürünler"} text={"Ürünleri listeleyin ve işlem yapın."}></TitleWithTextCentered>
            <div className='d-flex flex-row-reverse my-2'>
                <Button variant="primary" onClick={handleShow}>
                    Add Product
                </Button>            
            </div>

            <CustomTable onDeleteSuccess={handleDeleteSuccess} data={products} config={productsTableConfig}></CustomTable>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                    <Form onSubmit={handleAddCustomerSubmit}>

                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name='name' type="text" placeholder="Enter name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formWaterCost">
                            <Form.Label>Water Consumption (m3)</Form.Label>
                            <Form.Control name='waterCost' type="number" placeholder="Enter Water Consumption (m3)" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCost">
                            <Form.Label>Unit Cost</Form.Label>
                            <Form.Control name='cost' type="number" placeholder="Unit Cost" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCustomer">
                            <Form.Label>Customer</Form.Label>
                            <Form.Control name='customer' type="number" placeholder="Enter Customer Id" />
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