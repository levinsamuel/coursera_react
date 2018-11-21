import React, {Component} from 'react';
import { Label, Col, Row} from 'reactstrap';
import {Control, Errors} from 'react-redux-form';


const createForm = (Comp) => {

  return (class FormTemplate extends Component {

    constructor(props) {
      super(props);

      this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {

      return (
        <Comp/>
      );
    }


    decompEvent(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      return {target, value, name}
    }

    handleSubmit(event) {
      console.log("State:", this.state);
      alert("Thanks for of submit!!");
      event.preventDefault();
    }

  });
};

const ValidatedInput = (props) => {

  return (

    <Row className="form-group">
      <Label htmlFor={props.field} md={2}>{props.name}</Label>
      <Col md={10}>
        <Control.text type={props.type} id={props.field} name={props.field}
            placeholder={props.name} className="form-control"
            model={`.${props.field}`}
            validators={Object.keys(props.vrules).reduce((obj, k) => {
              obj[k] = props.vrules[k].test;
              return obj;
            }, {})}/>
        <Errors
            className="text-danger"
            model={`.${props.field}`}
            show="touched"
            messages={Object.keys(props.vrules).reduce((obj, k) => {
              obj[k] = props.vrules[k].message(props.field);
              return obj;
            }, {})}
         />
      </Col>
    </Row>
  );
}

export {createForm, ValidatedInput};
