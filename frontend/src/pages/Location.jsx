// src/components/LocationCrud.jsx
// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const LocationCrud = () => {
    const [locations, setLocations] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [locationToEdit, setLocationToEdit] = useState(null);
    const [locationToDelete, setLocationToDelete] = useState(null);
    const [newLocation, setNewLocation] = useState({
        location: '',
        status: 'Active',
    });

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/location/');
            setLocations(response.data);
        } catch (error) {
            console.error('Error fetching locations', error);
        }
    };

    const handleAddLocation = async () => {
        try {
            await axios.post('http://localhost:8000/api/location/', newLocation);
            fetchLocations();
            setShowAddModal(false);
            setNewLocation({
                location: '',
                status: 'Active',
            });
        } catch (error) {
            console.error('Error adding location',  error.response ? error.response.data : error.message);
        }
    };

    const handleUpdateLocation = async () => {
        try {
            await axios.put(`http://localhost:8000/api/location/${locationToEdit.id}/`, newLocation);
            fetchLocations();
            setShowEditModal(false);
            setLocationToEdit(null);
            setNewLocation({
                location: '',
                status: 'Active',
            });
        } catch (error) {
            console.error('Error updating location', error);
        }
    };

    const handleDeleteLocation = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/location/${locationToDelete.id}/`);
            fetchLocations();
            setShowDeleteModal(false);
            setLocationToDelete(null);
        } catch (error) {
            console.error('Error deleting location', error);
        }
    };

    return (
        <Container className="mt-5">
            <Row className='justify-content-end'>
                <Col md={8}>
                    <h2 className="mb-4">Location CRUD</h2>
                    <Button variant="primary" onClick={() => setShowAddModal(true)} className="mb-3">Add New</Button>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locations.map(location => (
                                <tr key={location.id}>
                                    <td>{location.id}</td>
                                    <td>{location.location}</td>
                                    <td>{location.status}</td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            onClick={() => {
                                                setLocationToEdit(location);
                                                setNewLocation({
                                                    location: location.location,
                                                    status: location.status,
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
                                                setLocationToDelete(location);
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

            {/* Add Location Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Location</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter location"
                                value={newLocation.location}
                                onChange={(e) => setNewLocation({ ...newLocation, location: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                value={newLocation.status}
                                onChange={(e) => setNewLocation({ ...newLocation, status: e.target.value })}
                            >
                                <option>Active</option>
                                <option>Inactive</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleAddLocation}>Save</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Location Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Location</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter location"
                                value={newLocation.location}
                                onChange={(e) => setNewLocation({ ...newLocation, location: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                value={newLocation.status}
                                onChange={(e) => setNewLocation({ ...newLocation, status: e.target.value })}
                            >
                                <option>Active</option>
                                <option>Inactive</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleUpdateLocation}>Save</Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Location Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Location</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this location?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Close</Button>
                    <Button variant="danger" onClick={handleDeleteLocation}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default LocationCrud;
