// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const ScheduleCrud = () => {
  const [schedules, setSchedules] = useState([]);
  const [buses, setBuses] = useState([]);
  const [locations, setLocations] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [scheduleToEdit, setScheduleToEdit] = useState(null);
  const [scheduleToDelete, setScheduleToDelete] = useState(null);
  const [newSchedule, setNewSchedule] = useState({
    code: '',
    bus: '',
    depart: '',
    destination: '',
    schedule: '',
    fare: 0,
    status: 'Active',
  });

  useEffect(() => {
    fetchSchedules();
    fetchBuses();
    fetchLocations();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/schedules/');
      setSchedules(response.data);
    } catch (error) {
      console.error('Error fetching schedules', error);
    }
  };

  const fetchBuses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/buses/');
      setBuses(response.data);
    } catch (error) {
      console.error('Error fetching buses', error);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/location/');
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations', error);
    }
  };

  const handleAddSchedule = async () => {
    try {
      await axios.post('http://localhost:8000/api/schedules/', newSchedule);
      fetchSchedules();
      setShowAddModal(false);
      setNewSchedule({
        code: '',
        bus: '',
        depart: '',
        destination: '',
        schedule: '',
        fare: 0,
        status: 'Active',
      });
    } catch (error) {
      console.error('Error adding schedule', error.response ? error.response.data : error.message);
    }
  };

  const handleUpdateSchedule = async () => {
    try {
      await axios.put(`http://localhost:8000/api/schedules/${scheduleToEdit.id}/`, newSchedule);
      fetchSchedules();
      setShowEditModal(false);
      setScheduleToEdit(null);
      setNewSchedule({
        code: '',
        bus: '',
        depart: '',
        destination: '',
        schedule: '',
        fare: 0,
        status: 'Active',
      });
    } catch (error) {
      console.error('Error updating schedule', error);
    }
  };

  const handleDeleteSchedule = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/schedules/${scheduleToDelete.id}/`);
      fetchSchedules();
      setShowDeleteModal(false);
      setScheduleToDelete(null);
    } catch (error) {
      console.error('Error deleting schedule', error);
    }
  };

  const getBusNameById = (id) => {
    const bus = buses.find(bus => bus.id === id);
    return bus ? bus.bus_number : 'Unknown';
  };

  return (
    <Container className="mt-5">
      <Row className='justify-content-end'>
        <Col md={10}>
          <h2 className="mb-4">Schedule CRUD</h2>
          <Button variant="primary" onClick={() => setShowAddModal(true)} className="mb-3">Add New</Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Code</th>
                <th>Bus</th>
                <th>Depart</th>
                <th>Destination</th>
                <th>Schedule</th>
                <th>Fare</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map(schedule => (
                <tr key={schedule.id}>
                  <td>{schedule.id}</td>
                  <td>{schedule.code}</td>
                  <td>{getBusNameById(schedule.bus)}</td>
                  <td>{locations.find(loc => loc.id === schedule.depart)?.location}</td>
                  <td>{locations.find(loc => loc.id === schedule.destination)?.location}</td>
                  <td>{new Date(schedule.schedule).toLocaleString()}</td>
                  <td>{schedule.fare}</td>
                  <td>{schedule.status}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setScheduleToEdit(schedule);
                        setNewSchedule({
                          code: schedule.code,
                          bus: schedule.bus,
                          depart: schedule.depart,
                          destination: schedule.destination,
                          schedule: schedule.schedule,
                          fare: schedule.fare,
                          status: schedule.status,
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
                        setScheduleToDelete(schedule);
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

      {/* Add Schedule Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCode">
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter schedule code"
                value={newSchedule.code}
                onChange={(e) => setNewSchedule({ ...newSchedule, code: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formBus">
              <Form.Label>Bus</Form.Label>
              <Form.Control
                as="select"
                value={newSchedule.bus}
                onChange={(e) => setNewSchedule({ ...newSchedule, bus: e.target.value })}
              >

                <option value="">Select Bus</option>
                {buses.map(bus => (
                  <option key={bus.id} value={bus.id}>{bus.bus_number}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDepart">
              <Form.Label>Depart Location</Form.Label>
              <Form.Control
                as="select"
                value={newSchedule.depart}
                onChange={(e) => setNewSchedule({ ...newSchedule, depart: e.target.value })}
              >
                <option value="">Select Departure Location</option>
                {locations.map(location => (
                  <option key={location.id} value={location.id}>{location.location}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDestination">
              <Form.Label>Destination Location</Form.Label>
              <Form.Control
                as="select"
                value={newSchedule.destination}
                onChange={(e) => setNewSchedule({ ...newSchedule, destination: e.target.value })}
              >
                <option value="">Select Destination Location</option>
                {locations.map(location => (
                  <option key={location.id} value={location.id}>{location.location}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formSchedule">
              <Form.Label>Schedule Date and Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={newSchedule.schedule}
                onChange={(e) => setNewSchedule({ ...newSchedule, schedule: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formFare">
              <Form.Label>Fare</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={newSchedule.fare}
                onChange={(e) => setNewSchedule({ ...newSchedule, fare: parseFloat(e.target.value) })}
              />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={newSchedule.status}
                onChange={(e) => setNewSchedule({ ...newSchedule, status: e.target.value })}
              >
                <option>Active</option>
                <option>Cancelled</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleAddSchedule}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Schedule Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCode">
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter schedule code"
                value={newSchedule.code}
                onChange={(e) => setNewSchedule({ ...newSchedule, code: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formBus">
              <Form.Label>Bus</Form.Label>
              <Form.Control
                as="select"
                value={newSchedule.bus}
                onChange={(e) => setNewSchedule({ ...newSchedule, bus: e.target.value })}
              >
                <option value="">Select Bus</option>
                {buses.map(bus => (
                  <option key={bus.id} value={bus.id}>{bus.bus_number}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDepart">
              <Form.Label>Depart Location</Form.Label>
              <Form.Control
                as="select"
                value={newSchedule.depart}
                onChange={(e) => setNewSchedule({ ...newSchedule, depart: e.target.value })}
              >
                <option value="">Select Departure Location</option>
                {locations.map(location => (
                  <option key={location.id} value={location.id}>{location.location}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDestination">
              <Form.Label>Destination Location</Form.Label>
              <Form.Control
                as="select"
                value={newSchedule.destination}
                onChange={(e) => setNewSchedule({ ...newSchedule, destination: e.target.value })}
              >
                <option value="">Select Destination Location</option>
                {locations.map(location => (
                  <option key={location.id} value={location.id}>{location.location}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formSchedule">
              <Form.Label>Schedule Date and Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={newSchedule.schedule}
                onChange={(e) => setNewSchedule({ ...newSchedule, schedule: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formFare">
              <Form.Label>Fare</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={newSchedule.fare}
                onChange={(e) => setNewSchedule({ ...newSchedule, fare: parseFloat(e.target.value) })}
              />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={newSchedule.status}
                onChange={(e) => setNewSchedule({ ...newSchedule, status: e.target.value })}
              >
                <option>Active</option>
                <option>Cancelled</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleUpdateSchedule}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Schedule Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this schedule?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Close</Button>
          <Button variant="danger" onClick={handleDeleteSchedule}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ScheduleCrud;
