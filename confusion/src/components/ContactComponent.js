import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button,
  Label, Col, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validatedInput = this.validatedInput.bind(this);
  }

  render() {

    return (
      <div className="container">
            <div className="row ">

              <Breadcrumb>
                <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Contact</BreadcrumbItem>
              </Breadcrumb>
            </div>
            <div className="row row-content">
              <div className="col-12">
                <h3>Location Information</h3>
              </div>
              <div className="col-12 col-sm-4 offset-sm-1">
                      <h5>Our Address</h5>
                      <address>
                      121, Clear Water Bay Road<br />
                      Clear Water Bay, Kowloon<br />
                      HONG KONG<br />
                      <i className="fa fa-phone"></i>: +852 1234 5678<br />
                      <i className="fa fa-fax"></i>: +852 8765 4321<br />
                      <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                      </address>
              </div>
              <div className="col-12 col-sm-6 offset-sm-1">
                  <h5>Map of our Location</h5>
              </div>
              <div className="col-12 col-sm-11 offset-sm-1">
                  <div className="btn-group" role="group">
                      <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                      <a role="button" className="btn btn-info" href="skype:ristoranteconfusion"><i className="fa fa-skype"></i> Skype</a>
                      <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                  </div>
              </div>
            </div>
            <div className="row row-content">
              <div className="col-12">
                <h3>Send us your feedback</h3>
              </div>
              <div className="col-12 col-md-9">
                <LocalForm onSubmit={values => this.handleSubmit(values)}>
                  {this.validatedInput("firstname", "First Name", "text")}
                  {this.validatedInput("lastname", "Last Name", "text")}
                  {this.validatedInput("telnum", "Tel. Number", "tel")}
                  {this.validatedInput("email", "Email", "email")}

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
                        Send Feedback
                      </Button>
                    </Col>
                  </Row>
                </LocalForm>
              </div>
            </div>
        </div>
    );
  }

  validatedInput (field, name, type) {

    return (

      <Row className="form-group">
        <Label htmlFor={field} md={2}>{name}</Label>
        <Col md={10}>
          <Control.text type={type} id={field} name={field}
              placeholder={name} className="form-control"
              model={`.${field}`}
              validators={{
                  required, minLength: minLength(3), maxLength: maxLength(15)
              }}/>

          <Errors
              className="text-danger"
              model={`.${field}`}
              show="touched"
              messages={{
                  required: 'Required',
                  minLength: 'Must be greater than 2 characters',
                  maxLength: 'Must be 15 characters or less'
              }}
           />
        </Col>
      </Row>
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

};

export default Contact;
