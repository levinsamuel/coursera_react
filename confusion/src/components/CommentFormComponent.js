
import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Input}
  from 'reactstrap';

class CommentForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  render() {
    return (
      <>
        <Button type="button" color="light" onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" name="username"
                    innerRef={(input) => this.username = input}/>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password"
                    innerRef={(input) => this.password = input}/>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" name="remember"
                      innerRef={(input) => this.remember = input}/>
                Remember Me</Label>
              </FormGroup>
              <Button type="submit" value="submit" color="primary">Login</Button>
            </Form>
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
}

export default CommentForm;
