import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

class BookFormModal extends React.Component {
  render() {

    return (
      <>
        <Modal show={this.props.isModalShown} onHide={this.props.handleCloseModal} animation={false} centered className="modal">
          <Modal.Header className="modalHeader" closeButton>
            <div className="modalTitleDiv">
              <Modal.Title>{this.props.mode === 'add' ? 'Add a Book' : 'Modify a Book'}</Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={this.props.mode === 'add' ? this.props.handleBookSubmit : this.props.handleBookUpdate}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder={this.props.mode === 'add' ? "Enter title" : this.props.bookToModify.title} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder={this.props.mode === 'add' ? "Add description" : this.props.bookToModify.description}  />
            </Form.Group>
            <Form.Group className="mb-3" controlId="status">
              <Form.Check type="checkbox" label="Favorites" />
            </Form.Group>
            <Button variant="primary" type="submit" className="button">
              Submit
            </Button>
          </Form>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

export default BookFormModal;
