import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

class BookFormModal extends React.Component {
  render() {

    return (
      <>
        <Modal show={this.props.isModalShown} onHide={this.props.handleCloseModal} animation={false} centered>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={this.props.handleBookSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" />
              {/* <Form.Text className="text-muted">
                Insert Book title here. */}
              {/* </Form.Text> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Add Description" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="status">
              <Form.Check type="checkbox" label="Favorites" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleCloseModal}>
              Close
            </Button>
            {/* <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button> */}
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default BookFormModal;
