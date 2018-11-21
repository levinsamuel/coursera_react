
import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalHeader, Label, Col, Row}
  from 'reactstrap';
import {Control, LocalForm} from 'react-redux-form';
import {ValidatedInput} from './templates/FormComponent';
import {REQUIRED, MINLENGTH, MAXLENGTH, ISNUMBER, VALIDEMAIL}
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
              <ValidatedInput field="firstname" name="First Name" type="text"
                  vrules={{REQUIRED, maxLength: MAXLENGTH(15), minLength: MINLENGTH(3)}} />
              <ValidatedInput field="lastname" name="Last Name" type="text"
                  vrules={{REQUIRED, maxLength: MAXLENGTH(15), minLength: MINLENGTH(3)}} />
              <ValidatedInput field="telnum" name="Tel. Number" type="tel" vrules={{REQUIRED, ISNUMBER}} />
              <ValidatedInput field="email" name="Email" type="email" vrules={{REQUIRED, VALIDEMAIL}} />

              <Row className="form-group">
                <Col md={{size: 6, offset: 2}}>
                  <div className="form-check">
                    <Label check>
                      <Control.checkbox type="checkbox" id="agree" name="agree"
                          placeholder="Email" model=".agree"
                          className="form-check-input"/>
                        {' '}<strong>May we contact you?</strong>
                    </Label>
                  </div>
                </Col>
                <Col md={{size: 3, offset: 1}}>
                  <Control.select type="select" id="contactType" name="contactType"
                      placeholder="Email" model=".contactType"
                      className="form-control">
                    <option>Tel.</option>
                    <option>Email</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="message" md={2}>Your Feedback</Label>
                <Col md={10}>
                  <Control.textarea type="textarea" id="message" name="message"
                      rows="12" model=".message"
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
    alert("Thanks for of submit!!");
    //event.preventDefault();
  }

}

export default CommentForm;
