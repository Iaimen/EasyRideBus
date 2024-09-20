import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const BusCrud = () => {
    const [buses, setBuses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [busToEdit, setBusToEdit] = useState(null);
    const [busToDelete, setBusToDelete] = useState(null);
    const [newBus, setNewBus] = useState({
        category: '',
        bus_number: '',
        seats: 0,
        status: 'Active',
    });

    useEffect(() => {
        fetchBuses();
        fetchCategories();
    }, []);

    const fetchBuses = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/buses/');
            setBuses(response.data);
        } catch (error) {
            console.error('Error fetching buses', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/categories/');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories', error);
        }
    };

    const handleAddBus = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/buses/', newBus);
            console.log('Bus added successfully:', response.data);
            fetchBuses();
            setShowAddModal(false);
            setNewBus({
                category: '',
                bus_number: '',
                seats: 0,
                status: 'Active',
            });
        } catch (error) {
            if (error.response) {
                console.error('Error adding bus:', error.response.data);
                alert(`Error: ${error.response.data.non_field_errors || 'An error occurred while adding the bus.'}`);
            } else if (error.request) {
                console.error('Error adding bus:', error.request);
                alert('No response from the server. Please try again later.');
            } else {
                console.error('Error adding bus:', error.message);
                alert(`Error: ${error.message}`);
            }
        }
    };

    const handleUpdateBus = async () => {
        try {
            await axios.put(`http://localhost:8000/api/buses/${busToEdit.id}/`, newBus);
            fetchBuses();
            setShowEditModal(false);
            setBusToEdit(null);
            setNewBus({
                category: '',
                bus_number: '',
                seats: 0,
                status: 'Active',
            });
        } catch (error) {
            console.error('Error updating bus', error);
        }
    };

    const handleDeleteBus = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/buses/${busToDelete.id}/`);
            fetchBuses();
            setShowDeleteModal(false);
            setBusToDelete(null);
        } catch (error) {
            console.error('Error deleting bus', error);
        }
    };

    const getCategoryNameById = (id) => {
        const category = categories.find(cat => cat.id === id);
        return category ? category.name : 'Unknown';
    };

    return (
        <Container className="mt-5">
            <Row className='justify-content-end'>
                <Col md={8}>
                    <h2 className="mb-4">Bus CRUD</h2>
                    <Button variant="primary" onClick={() => setShowAddModal(true)} className="mb-3">Add New</Button>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Category</th>
                                <th>Bus Number</th>
                                <th>Seats</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {buses.map(bus => (
                                <tr key={bus.id}>
                                    <td>{bus.id}</td>
                                    <td>{getCategoryNameById(bus.category)}</td>
                                    <td>{bus.bus_number}</td>
                                    <td>{bus.seats}</td>
                                    <td>{bus.status === 'Active' ? 'Active' : 'Inactive'}</td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            onClick={() => {
                                                setBusToEdit(bus);
                                                setNewBus({
                                                    category: bus.category,
                                                    bus_number: bus.bus_number,
                                                    seats: bus.seats,
                                                    status: bus.status,
                                                });
                                                setShowEditModal(true);
                                            }}
                                            className="me-2"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => {
                                                setBusToDelete(bus);
                                                setShowDeleteModal(true);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            {/* Add Bus Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Bus</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                value={newBus.category}
                                onChange={(e) => setNewBus({ ...newBus, category: e.target.value })}
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBusNumber">
                            <Form.Label>Bus Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter bus number"
                                value={newBus.bus_number}
                                onChange={(e) => setNewBus({ ...newBus, bus_number: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formSeats">
                            <Form.Label>Seats</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter number of seats"
                                value={newBus.seats}
                                onChange={(e) => setNewBus({ ...newBus, seats: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                value={newBus.status}
                                onChange={(e) => setNewBus({ ...newBus, status: e.target.value })}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleAddBus}>Save</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Bus Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Bus</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                value={newBus.category}
                                onChange={(e) => setNewBus({ ...newBus, category: e.target.value })}
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBusNumber">
                            <Form.Label>Bus Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter bus number"
                                value={newBus.bus_number}
                                onChange={(e) => setNewBus({ ...newBus, bus_number: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formSeats">
                            <Form.Label>Seats</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter number of seats"
                                value={newBus.seats}
                                onChange={(e) => setNewBus({ ...newBus, seats: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                value={newBus.status}
                                onChange={(e) => setNewBus({ ...newBus, status: e.target.value })}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleUpdateBus}>Save</Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Bus Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Bus</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this bus?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Close</Button>
                    <Button variant="danger" onClick={handleDeleteBus}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default BusCrud;
