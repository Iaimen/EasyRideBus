import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const BookingCrud = () => {
  const [bookings, setBookings] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookingToEdit, setBookingToEdit] = useState(null);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [newBooking, setNewBooking] = useState({
    code: '',
    name: '',
    schedule: '',
    seats: '',
    status: 'Pending',
  });

  useEffect(() => {
    fetchBookings();
    fetchSchedules();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/booking/');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings', error);
    }
  };

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/schedules/');
      setSchedules(response.data);
    } catch (error) {
      console.error('Error fetching schedule', error);
    }
  };

  const handleAddBooking = async () => {
    try {
      if (!newBooking.code || !newBooking.name || !newBooking.schedule || !newBooking.seats) {
        alert('Please fill all fields');
        return;
      }

      // Validate available seats
      const selectedSchedule = schedules.find(schedule => schedule.id === newBooking.schedule);
      if (selectedSchedule && selectedSchedule.count_available < newBooking.seats) {
        alert('Not enough available seats');
        return;
      }

      await axios.post('http://localhost:8000/api/booking/', newBooking);

      fetchBookings();
      setShowAddModal(false);
      setNewBooking({
        code: '',
        name: '',
        schedule: '',
        seats: '',
        status: 'Pending',
      });
    } catch (error) {
      console.error('Error adding booking', error);
    }
  };

  const handleUpdateBooking = async () => {
    try {
      await axios.put(`http://localhost:8000/api/booking/${bookingToEdit.id}/`, newBooking);
      fetchBookings();
      setShowEditModal(false);
      setBookingToEdit(null);
      setNewBooking({
        code: '',
        name: '',
        schedule: '',
        seats: '',
        status: 'Pending',
      });
    } catch (error) {
      console.error('Error updating booking', error);
    }
  };

  const handleDeleteBooking = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/booking/${bookingToDelete.id}/`);
      fetchBookings();
      setShowDeleteModal(false);
      setBookingToDelete(null);
    } catch (error) {
      console.error('Error deleting booking', error);
    }
  };
  const getScheduleCodeById = (id) => {
    const schedule = schedules.find(schedule => schedule.id === id);
    return schedule ? schedule.code : 'Unknown';
  };


  return (
    <Container className="mt-5">
      <Row className="justify-content-end">
        <Col md={8}>
          <h2 className="mb-4">Booking CRUD</h2>
          <Button variant="primary" onClick={() => setShowAddModal(true)} className="mb-3">Add New</Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Code</th>
                <th>Name</th>
                <th>Schedule</th>
                <th>Seats</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.code}</td>
                  <td>{booking.name}</td>
                  <td>{getScheduleCodeById(booking.schedule) }</td>
                  <td>{booking.seats}</td>
                  <td>{booking.status}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setBookingToEdit(booking);
                        setNewBooking({
                          code: booking.code,
                          name: booking.name,
                          schedule: booking.schedule ? booking.schedule.id : '',
                          seats: booking.seats,
                          status: booking.status,
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
                        setBookingToDelete(booking);
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

      {/* Add Booking Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCode">
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter booking code"
                value={newBooking.code}
                onChange={(e) => setNewBooking({ ...newBooking, code: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter customer name"
                value={newBooking.name}
                onChange={(e) => setNewBooking({ ...newBooking, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formSchedule">
              <Form.Label>Schedule</Form.Label>
              <Form.Control
                as="select"
                value={newBooking.schedule}
                onChange={(e) => setNewBooking({ ...newBooking, schedule: e.target.value })}
              >
                <option value="">Select Schedule</option>
                {schedules.map(schedule => (
                  <option key={schedule.id} value={schedule.id}>{schedule.code}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formSeats">
              <Form.Label>Seats</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of seats"
                value={newBooking.seats}
                onChange={(e) => setNewBooking({ ...newBooking, seats: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={newBooking.status}
                onChange={(e) => setNewBooking({ ...newBooking, status: e.target.value })}
              >
                <option>Pending</option>
                <option>Paid</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleAddBooking}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Booking Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCode">
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter booking code"
                value={newBooking.code}
                onChange={(e) => setNewBooking({ ...newBooking, code: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter customer name"
                value={newBooking.name}
                onChange={(e) => setNewBooking({ ...newBooking, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formSchedule">
              <Form.Label>Schedule</Form.Label>
              <Form.Control
                as="select"
                value={newBooking.schedule}
                onChange={(e) => setNewBooking({ ...newBooking, schedule: e.target.value })}
              >
                <option value="">Select Schedule</option>
                {schedules.map(schedule => (
                  <option key={schedule.id} value={schedule.id}>{schedule.code}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formSeats">
              <Form.Label>Seats</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of seats"
                value={newBooking.seats}
                onChange={(e) => setNewBooking({ ...newBooking, seats: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={newBooking.status}
                onChange={(e) => setNewBooking({ ...newBooking, status: e.target.value })}
              >
                <option>Pending</option>
                <option>Paid</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleUpdateBooking}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Booking Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this booking?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteBooking}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BookingCrud;
