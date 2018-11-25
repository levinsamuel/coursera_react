
import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalHeader, Label, Col, Row}
  from 'reactstrap';
import {Control, LocalForm} from 'react-redux-form';
import {ValidatedInput} from './templates/FormComponent';
import {REQUIRED, MINLENGTH, MAXLENGTH}
  from '../shared/rules';

class CommentForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <>
        <Button type="button" color="light" onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={2}>Rating</Label>
                <Col md={10}>
                  <Control.select type="select" id="rating" name="rating"
                      model=".rating"
                      className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <ValidatedInput field="author" name="Author" type="text"
                  vrules={{REQUIRED, maxLength: MAXLENGTH(15), minLength: MINLENGTH(3)}} />
              <Row className="form-group">
                <Label htmlFor="message" md={2}>Your Feedback</Label>
                <Col md={10}>
                  <Control.textarea type="textarea" id="comment" name="comment"
                      rows="12" model=".comment"
                      className="form-control"/>
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{size:10, offset:2}}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }

  toggleModal() {
    this.setState((state, props) => ({
        isModalOpen: !state.isModalOpen
    }));
  }

  handleSubmit(values) {
    console.log("values:", values);
    this.props.addComment(this.props.dishId, values.rating, values.author,
      values.comment);
  }

}

export default CommentForm;
