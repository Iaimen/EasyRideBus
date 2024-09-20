// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const CategoryCrud = () => {
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    status: 'Active',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categories/');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  const handleAddCategory = async () => {
    try {
      await axios.post('http://localhost:8000/api/categories/', newCategory);
      fetchCategories();
      setShowAddModal(false);
      setNewCategory({
        name: '',
        description: '',
        status: 'Active',
      });
    } catch (error) {
      console.error('Error adding category', error);
    }
  };

  const handleUpdateCategory = async () => {
    try {
      await axios.put(`http://localhost:8000/api/categories/${categoryToEdit.id}/`, newCategory);
      fetchCategories();
      setShowEditModal(false);
      setCategoryToEdit(null);
      setNewCategory({
        name: '',
        description: '',
        status: 'Active',
      });
    } catch (error) {
      console.error('Error updating category', error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/categories/${categoryToDelete.id}/`);
      fetchCategories();
      setShowDeleteModal(false);
      setCategoryToDelete(null);
    } catch (error) {
      console.error('Error deleting category', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className='justify-content-end'>
        <Col md={8}>
          <h2 className="mb-4">Category CRUD</h2>
          <Button variant="primary" onClick={() => setShowAddModal(true)} className="mb-3">Add New</Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>{category.status}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setCategoryToEdit(category);
                        setNewCategory({
                          name: category.name,
                          description: category.description,
                          status: category.status,
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
                        setCategoryToDelete(category);
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

      {/* Add Category Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={newCategory.status}
                onChange={(e) => setNewCategory({ ...newCategory, status: e.target.value })}
              >
                <option>Active</option>
                <option>Inactive</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleAddCategory}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Category Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={newCategory.status}
                onChange={(e) => setNewCategory({ ...newCategory, status: e.target.value })}
              >
                <option>Active</option>
                <option>Inactive</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleUpdateCategory}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Category Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this category?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Close</Button>
          <Button variant="danger" onClick={handleDeleteCategory}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CategoryCrud;
